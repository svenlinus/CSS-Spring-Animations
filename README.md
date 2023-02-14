# CSS-Spring-Animations
View:
https://lankmann.github.io/CSS-Spring-Animations/

Create physics based css animations

Manipulate "generateKeyframe" to animate any css property:

* replace "translateX()" and "skewX()" with your desired css property
* add units
* use arithmetic, map(), constrain(), any Math function, or any p5.js function to fit pos/vel/acc to your desired range
* Examples:
  * '{ transform: translateX(' + pos + 'px); }'
    * element will move along x-axis according to graph
  * '{ transform: scaleY(' + map(vel, -20, 20, 0, 2) + '); }'
    * element will stretch and contract relative to its velocity (mapped between 0 and 2)

GenerateKeyFrame Arguments:

* i = index of point in points array
* pos = position, f(x), point on graph
* vel = velocity, f'(x), derivative of point on graph
* acc = acceleration, f"(x), second derivative of point on graph

Useful helper functions:

* map() https://p5js.org/reference/#/p5/map (change the range of a variable) 
  * ex. map(vel, -20, 20, 0, 2) returns a velocity scaled down to range between 0 and 2 instead of -20 and 20
    * (original range determined by Max velocity)
* constrain() https://p5js.org/reference/#/p5/constrain (limit between two value)

![Screen Shot 2022-09-07 at 11 53 47 PM](https://user-images.githubusercontent.com/67165825/189054900-108b7e08-5b5c-4666-ba79-369e698a6fe1.png)
![Screen Shot 2022-09-07 at 10 40 14 PM](https://user-images.githubusercontent.com/67165825/189054721-3d510df3-28a3-4d83-a2a5-0d641dc4e2ef.png)
![Screen Shot 2022-09-07 at 10 42 48 PM](https://user-images.githubusercontent.com/67165825/189054763-7ee13820-19c1-42bf-a353-a9598e25255f.png)
