import React from "react";
import { Column, Grid, Text } from "@twilio-paste/core";
import Image404 from "./404.png";

export const NotFound = () => (
  <Grid gutter={["space20", "space40", "space100"]} vertical>
    <Column span={10} offset={1}>
      <Text
        as="div"
        textAlign="center"
        padding={["space40", "space60", "space100"]}
      >
        <Text
          as="h2"
          fontSize={["fontSize20", "fontSize40", "fontSize60"]}
          padding={["space10", "space20", "space40"]}
        >
          Ops!
        </Text>
        <Text
          as="h2"
          fontSize={["fontSize20", "fontSize40", "fontSize60"]}
          padding={["space10", "space20", "space40"]}
        >
          We can't find what you're looking for
        </Text>
      </Text>
      <Text
        as="div"
        textAlign="center"
        padding={["space40", "space60", "space100"]}
      >
        <img src={Image404} alt="404 not found" width="100%" />
      </Text>
    </Column>
  </Grid>
);
