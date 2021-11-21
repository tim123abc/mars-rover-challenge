# Mars Rover Challenge

### Getting started

To Run tests:

* `npm install`             install project dependencies.
* `npm run test`             run the unit tests.

To Run program:

* `npm install`             install project dependencies.
* `npm start`             start the program in the commandline.

To Finish entering data:

* enter `q` after entering 1 or more rovers and the program will execute and output the mission result to the console.
  <br />

# Problem Statement

Write a program that takes in commands and moves one or more robots around Mars.

* The world should be modelled as a grid with size m x n
* Your program should read the input, update the robots, and print out the final states of the robots
* Each robot has a position (x, y), and an orientation (N, E, S, W)
* Each robot can move forward one space (F), rotate left by 90 degrees (L), or rotate right by 90 degrees (R)
* If a robot moves off the grid, it is marked as ‘lost’ and its last valid grid position and orientation is recorded 
*Going from x -> x + 1 is in the easterly direction, and y -> y + 1 is in the northerly direction. i.e. (0, 0) represents the south-west
  corner of the grid
  <br/>
  
The input takes the form:
* The first line of the input <b>‘4 8’</b> specifies the size of the grid.

* The subsequent lines each represent the initial state and commands for a single robot. (0, 2, N) specifies the initial
state of the form (x, y, orientation). FFLFRFF represents the sequence of movement commands for the robot. 
  
The output should take the form:
* Each line represents the final position and orientation of the robots of the form (x, y, orientation) and optionally
whether the robot was lost.
  
Input: <br>
48<br>
(2, 3, E) LFRFF<br>
(0, 2, N) FFLFRFF<br>

Returns:<br>
(4, 4, E)<br>
(0, 4, W) LOST <br>

Another example for the input:<br>
48 <br>
(2, 3, N) FLLFR <br>
(1, 0, S) FFRLF <br>

The output would be:<br>
(2, 3, W)<br>
(1, 0, S) LOST
