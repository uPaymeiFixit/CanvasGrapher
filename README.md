# canvas-grapher
HTML5 / JavaScript Practice

An early project created to practice JavaScript and HTML. Uses HTML5 canvas to draw a parametric colored graph. 

A collection of parametric graphs are stored and used to draw line segmens on the canvas. The lines are drawn by calculating `(x1, y1)` from the parametric equation, incrementing `T`, then calculating `(x2, y2)` and drawing a line between them. The script could be easily modified to handle any type of non-parametric curve. Below is an example of the butterfly curve graph and its equation.

![equation-x](http://upload.wikimedia.org/wikipedia/en/math/1/d/6/1d641d8a2dd4fdfbf4b721de6ce06588.png)

![equation-y](http://upload.wikimedia.org/wikipedia/en/math/6/9/4/69465d3672b5c8eef2fc96f4753c5ad2.png)

### Controls
**Click:** Change graph

**Double click:** Enter full screen

[Live Demo](https://gibbs.tk/portfolio/canvas-grapher/demo/)

![screenshot](https://user-images.githubusercontent.com/1683528/30258124-8d60adf6-966b-11e7-95b9-e6e6ccb41022.png)
