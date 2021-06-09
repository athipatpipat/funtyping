
// Utility functions
console.log("helllooooo")
let animation_life = 1;
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
			// Or no background? 

			// I'm converting milliseconds to seconds,
			// because its easier to think about
			let t = p.millis()*.001

			// You can also change the speed by multiplying by 4
			t *= 4
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

	{	
		title: "Polar noise trick", 
		draw(p) {
			if (animation_life <= 0) {
				return
			}
			animation_life -= 1
			let t = p.millis()*.001
			let length = 6
			let loopPct = (t/length)%1
			let thetaPct = loopPct*Math.PI*2

			p.background("white")
			p.noiseDetail(6, 0.4);

			
			
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
			p.translate(p.width/2, 0)


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
