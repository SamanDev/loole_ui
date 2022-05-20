import React, { lazy } from "react";
import { Segment } from "semantic-ui-react";

const Helpblog = lazy(() => import("components/help.component"));
const devWid = document.documentElement.clientWidth;
const SegmentExampleHorizontalSegments = (prop) => (
  <Segment.Group
    piled
    horizontal={devWid > 500 ? true : false}
    stacked
    size="mini"
  >
    <Segment size="mini">
      <Helpblog {...prop} lang="gb" />
    </Segment>
    <Segment>
      <Helpblog {...prop} lang="ir" />
    </Segment>
    <Segment>
      <Helpblog {...prop} lang="tr" />
    </Segment>
  </Segment.Group>
);

export default SegmentExampleHorizontalSegments;
