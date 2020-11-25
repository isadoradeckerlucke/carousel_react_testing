import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// smoke test
it("renders without crashing", function(){
  render(<Carousel />)
})

// snapshot test 
it('matches snapshot', function(){
  const {asFragment} = render(<Carousel />)
  expect(asFragment()).toMatchSnapshot()
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");

  // click right arrow so that we start on the second image
  fireEvent.click(rightArrow);
  // now click left arrow and expect to go back to first image
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});


it("hides arrows at either end of image array", function(){
  const { queryByTestId } = render(<Carousel />);

  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");

  // on first image, which it defaults to, the left arrow should be hidden and the right arrow should show
  expect(leftArrow).toHaveClass('hidden')
  expect(rightArrow).not.toHaveClass('hidden')

  // click forward
  fireEvent.click(rightArrow);

  // on images that aren't first or last, expect both arrows to show
  expect(leftArrow).not.toHaveClass('hidden')
  expect(rightArrow).not.toHaveClass('hidden')

  // click forward to last image
  fireEvent.click(rightArrow);

  // on last image, expect left arrow to show and right arrow to be hidden
  expect(leftArrow).not.toHaveClass('hidden')
  expect(rightArrow).toHaveClass('hidden')

})