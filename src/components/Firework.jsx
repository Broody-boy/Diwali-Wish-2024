import React, { useEffect, useRef } from "react";
import p5 from "p5";

const Fireworks = () => {
  const fireworksRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let fireworks = [];
      let gravity;

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.stroke(255);
        p.strokeWeight(4);
        gravity = p.createVector(0, 0.16);
        p.noFill(); // No fill for transparency
      };

      p.draw = () => {
        // Clear the canvas for transparent background effect
        p.clear(); 
        
        if (p.frameCount % 35 === 0) {
          fireworks.push(new Firework());
        }

        for (let i = fireworks.length - 1; i >= 0; i--) {
          if (fireworks[i].done) {
            fireworks.splice(i, 1);
          } else {
            fireworks[i].update();
            fireworks[i].show();
          }
        }
      };

      // Particle class
      class Particle {
        constructor(x, y, firework) {
          this.pos = p.createVector(x, y);
          this.lifespan = 255;
          this.firework = firework;
          this.color = [p.random(70, 255), p.random(70, 255), p.random(70, 255)];
          
          if (firework) {
            this.vel = p.createVector(0, p.random(-12, -8)); // Adjusted velocity
          } else {
            this.vel = p5.Vector.random2D();
            this.vel.mult(p.random(2, 10)); // Adjusted explosion speed
          }
          this.acc = p.createVector(0, 0);
        }

        applyForce(force) {
          this.acc.add(force);
        }

        update() {
          if (!this.firework) {
            this.vel.mult(0.95); // Slightly slower decay for particles
            this.lifespan -= p.random(3, 5);
          }
          this.vel.add(this.acc);
          this.pos.add(this.vel);
          this.acc.mult(0);
        }

        show() {
          // Increased strokeWeight for a bigger trail
          if (!this.firework) {
            p.stroke(this.color[0], this.color[1], this.color[2], this.lifespan);
            p.strokeWeight(4); // Increased trail size
          } else {
            p.stroke(255);
            p.strokeWeight(5); // Increased size for the firework
          }
          p.point(this.pos.x, this.pos.y);
        }
      }

      // Firework class
      class Firework {
        constructor() {
          this.firework = new Particle(p.random(30, p.width - 30), p.height, true);
          this.exploded = false;
          this.particles = [];
          this.done = false;
        }

        update() {
          if (!this.exploded) {
            this.firework.applyForce(gravity);
            this.firework.update();
            if (this.firework.vel.y >= 0) {
              this.exploded = true;
              this.explode();
            }
          } else {
            if (this.particles.length === 0) this.done = true;
            for (let i = this.particles.length - 1; i >= 0; i--) {
              if (this.particles[i].lifespan < 1) {
                this.particles.splice(i, 1);
              } else {
                this.particles[i].applyForce(gravity);
                this.particles[i].update();
              }
            }
          }
        }

        explode() {
          for (let i = 0; i < p.random(50, 100); i++) {
            const p = new Particle(this.firework.pos.x, this.firework.pos.y, false);
            this.particles.push(p);
          }
        }

        show() {
          if (!this.exploded) {
            this.firework.show();
          } else {
            for (let i = 0; i < this.particles.length; i++) {
              this.particles[i].show();
            }
          }
        }
      }

      // Clean up p5 instance on component unmount
      return () => {
        p.remove();
      };
    };

    // Create a new p5 instance with the sketch
    new p5(sketch, fireworksRef.current);

    return () => {
      fireworksRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={fireworksRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
};

export default Fireworks;
