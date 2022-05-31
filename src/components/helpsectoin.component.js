import React, { lazy } from "react";
import { Segment, Button, Header, Icon } from "semantic-ui-react";

const Helpblog = lazy(() => import("components/help.component"));
const devWid = document.documentElement.clientWidth;
const SegmentExampleHorizontalSegments = (prop) => (
  <>
    <Segment inverted>
      {prop.game ? (
        <Header as="h3">
          <Icon name="world" size="mini" circular color="teal" />
          {prop.game} guide
        </Header>
      ) : (
        <Header as="h3">Loole.gg Blog</Header>
      )}

      <Button.Group widths="6">
        <Helpblog {...prop} lang="gb" />
        <Helpblog {...prop} lang="ir" />

        <Helpblog {...prop} lang="tr" />

        <Helpblog {...prop} lang="ru" />
        <Helpblog {...prop} lang="sa" />

        <Helpblog {...prop} lang="es" />
      </Button.Group>
    </Segment>
  </>
);

export default SegmentExampleHorizontalSegments;
