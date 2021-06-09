
// Utility functions
console.log("helllooooo")
// Given a processing object, a pct around the circle, a radius, and an offset (optional)
function getLoopingNoise({
	p,
	loopPct,
	radius,
	offset = 0
}) {
  
  // This number should go from 0 to 1 every loopLength seconds
  // And PI*2 radians every loopLength seconds
 
  let theta = 2 * Math.PI * loopPct

  // Place to sample the noise from
  let x = radius * Math.cos(theta)
  let y = radius * Math.sin(theta)

  let noiseVal = p.noise(x + 100, y + 30, offset)

  return noiseVal
}


let animations = [


	// Each animation is represented an object
	// with a title, setup, and draw function
	// This one draws a circle moving around
	{
		skip:true,
		title: "basic",

		// Both draw and setup have access to the processing object "p"
		draw: function(p) {
			// Each frame, draw a light gray background
			p.background(0, 0, 80)
			// Or a semi transparent background
			// p.background(0, 0, 80, .1)
			// Or no background? Try commenting these background lines
			// on and off and see how they change

			// I'm converting milliseconds to seconds,
			// because its easier to think about
			let t = p.millis()*.001

			// You can also change the speed by multiplying by 4
			// t *= 4
			// t *= .4

			let x = p.width*(.5 + .5*Math.sin(t*2))
			let y = p.width*(.5 + .5*Math.sin(t*1.71))

			let hue = (t*50)%360
			let circleRadius = 60*p.noise(t)
			p.strokeWeight(5)
			p.stroke(hue, 100, 20)
			p.fill(hue, 100, 50)
			p.circle(x, y, circleRadius)
		}
	},

	// Use loops to draw multiple objects on screen
	{
		skip:true,
		title: "loops",

		// Both draw and setup have access to the processing object "p"
		draw: function(p) {
			// Each frame, draw a light gray background
			// p.background(0, 0, 80, 0)


			// I'm converting milliseconds to seconds,
			// because its easier to think about
			let t = p.millis()*.001

			for (var i = 0; i < 40; i++) {
				// Go from right to left
				let x = (t*70 + i*20)
				let y = (t*70 + i*5) + 100*p.noise(t + i*.1)

				// Loop around!
				x %= p.width
				y %= p.height

				let hue = (t*50 + i)%360
				let circleRadius = 10

				// Make a drop shadow
				p.noStroke()
				p.fill(hue, 100, 0, .1)
				p.circle(x, y + 10, circleRadius*1)

				p.fill(hue, 100, 50)
				p.circle(x, y, circleRadius)
			}
		}
	},


	// Polar coordinates and translations in P5 (push/pop)

	 {
		skip:true,
		title: "polar coordinates",
		setup: function(p) {
			p.background(80)
		},
		draw: function(p) {
			let t = (p.millis()*.001)%1
			// This cycle goes from 0 - 2*PI every second
			// If we feed that into any sin or cos function, it will loop
			let cycle = 2*Math.PI*t

			// ---- Make a function, this lets us reuse code many times ---
			// Draw a single flower, and reset any transformations
			function drawFlower(hue, height) {

				p.push()
				p.fill("green")
				p.rect(0, 0, 5, -height)

				let leafCount = 10
				for (var i = 0; i < leafCount; i++) {
					p.stroke("white")
					let leafPct = i/leafCount
					p.push()
					p.translate(0, -height*leafPct)
					p.rotate(Math.PI + 1.9*(i%2 - .5))
					let leafLength = 10 + 20*leafPct
					p.ellipse(0, leafLength/2, 5, leafLength)
					p.pop()

				}

				p.translate(0, -height)
				let count = 30
				for (var i = 0; i < count; i++) {

					// How far to rotate each time?
					p.rotate(Math.PI*2/count)


					p.fill(hue, 100, 40, .5)
					p.stroke(hue, 100, 80, 1)

					let petalLength = 50
					p.ellipse(0, petalLength/2, 10, petalLength)
				}

				p.pop()
			}

			// Draw the background
			p.background(80)


			// Draw grass at the bottom of the screen
			// Notice how I can use p.height and p.width
			// to make something fill the screen or be at the bottom
			p.fill("green")
			p.rect(0, p.height, p.width, -30)

			p.circle(p.width, p.height, 10)
			p.circle(p.width/2, p.height/2, 10)

			// Draw some number of flowers
			let flowerCount = 3
			for (var i = 0; i < flowerCount; i++) {
				let pct = i/(flowerCount - 1)
				p.push()
				p.translate(pct*p.width, p.height - 10)

				// How tall is the flower?  Instead of using t, we can use Math.sin(cycle) to loop
				let length = 100*(2 + Math.sin(cycle + i))
				// drawFlower takes two parameters, hue, length
				drawFlower(i*30, length)
				p.pop();
			}


			// Move to the center of the screen
			p.push()
			p.translate(p.width/2, p.height/2)

			// Drawing some polar coordinate shapes
			p.beginShape()
			let count2 = 220;

			p.fill(0, 0, 100, .3)
			p.stroke(0)

			for (var i = 0; i < count2; i++) {
				// Save the percent so we can use it later
				let pct = i/count2
				let radius = i
				let theta = 6*Math.PI*2*pct

				radius += 100*Math.sin(cycle) + 40*Math.abs(Math.sin(theta*40))

				let x = radius*Math.cos(theta)
				let y = radius*Math.sin(theta)

				p.curveVertex(x, y)
				// p.rect(x, y, 10, 100)
			}
			p.endShape()

			p.pop()

		}
	},

	// Perfect looping with moving off the screen
	{	
		skip:true,
		title: "Linear looping",
		draw(p) {
			p.background(0, 0, 100, .11)
			let t = p.millis()*.001
			// How many seconds long is our loop?  You can use that to time your gifs
			let loopTime = 3
			let cyclePct = (t/loopTime)%1
			// If we drive *everything* off the cyclePct and not use random or time
			// we can notice if it loops perfectly

			// Output the cycle in the top left corner to visualize it
			p.text("cycle: " + cyclePct.toFixed(2), 20, 20)

			for (var i = 0; i < 1; i++) {
				// How many times do we go across the screen in a loop?
				let xSpeed = i%3 + 1 + .3
				let x = i*21 + (cyclePct*xSpeed)*p.width
				let y = i*72 + cyclePct*p.height
				x %= p.width
				y %= p.height

				p.noStroke()
				let hue = i*2
				p.fill(hue, 100, 50)
				p.stroke(hue, 100, 20)
				p.circle(x, y, 10)
			}





		}

	},


	// Looping
	// To make a "perfect loop", all the objects need to end up back where they started
	// They can do this by getting back to their position, or getting to the starting position of the next objects
	{
		title: "Polar looping",

		skip: true,
		draw(p) {
			p.background(0, 0, 100, .01)
			let t = p.millis()*.001
			// How many seconds long is our loop?  You can use that to time your gifs
			let loopTime = 6
			let cyclePct = (t/loopTime)%1

			let count = 20

			// Move to the center
			p.push()
			p.translate(p.width/2, p.height/2)

			for (var i = 0; i < count; i++) {
				// If we have N particles, each one only has to go
				// dTheta radians to get to the next particles start point
				let dTheta = Math.PI*2/count

				// Start at dTheta*i, end up at dTheta*(1 + i)
				let i2 = i + cyclePct
				let theta = i2*dTheta

				// Start at dTheta*i, end up at dTheta*(1 + i)
				let polarRadius = 100 + 40*Math.cos(Math.PI*i2)

				let circleRadius = 10*(1.5 + Math.sin(Math.PI*i2))

				// Loop all the way around the color wheel
				let hue = i2*360/count
				p.fill(hue, 100, 50)
				p.stroke(hue, 100, 20)

				let x = polarRadius*Math.cos(theta)
				let y = polarRadius*Math.sin(theta)
				p.circle(x, y, circleRadius)
			}

			p.pop()
		}

	},

	{	
		title: "Polar noise trick", 
		draw(p) {
			let t = p.millis()*.001
			let length = 6
			let loopPct = (t/length)%1
			let thetaPct = loopPct*Math.PI*2

			p.background("white")
			p.noiseDetail(6, 0.4);

			// Output the current time
			p.fill(0)
			p.text(loopPct.toFixed(2), 10, 10)
			p.stroke(0)
			
			// Draw a little clock
			p.push()
			p.translate(20, 30)
			p.noFill()
			p.circle(0, 0, 20)
			p.line(0, 0, 10*Math.sin(thetaPct), -10*Math.cos(thetaPct))
			p.pop()

			let count = 100
			for (var j = 0; j < 20; j++) {
				p.stroke(j*3 + 150, 100, 50)
				p.fill(j*3 + 150, 100, 50, .3)
						
				p.beginShape()
				for (var i = 0; i < count; i++) {
					let pct = i/count
					let y = 200*p.noise(pct, Math.sin(thetaPct), j*.1)
					let x = pct*p.width
					p.vertex(x, y)
					// p.rect(x, p.height, p.width/count,  - y)

				}
				p.endShape()
			}
			
			//----------------------------------
			// Draw a circle moving back and forth, but looping!

			p.push()
			p.translate(p.width/2, p.height/2)


			p.noiseDetail(3, 0.5);
			for (var i = 0; i < 20; i++) {

				p.fill((i*30 + 50)%360, 100, 50, .3)
				let offset = i*.1
				let radius = getLoopingNoise({
					p:p,
					loopPct: loopPct,
					radius: .1,
					offset: offset
				})

				let x = getLoopingNoise({
					p:p,
					loopPct: loopPct,
					radius: .4,
					offset: offset + 10
				}) - .5 // Subtracting .5 centers the noise around 0 instead of .5
				
				let y = getLoopingNoise({
					p:p,
					loopPct: loopPct,
					radius: 1,
					offset: offset + 20
				}) - .5 // Subtracting .5 centers the noise around 0 instead of .5

				p.circle(x*400, y*150 + 90, 90*radius)
				
			}

			p.pop()

		}

	}


]
