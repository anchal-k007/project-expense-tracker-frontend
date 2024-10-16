import React from "react";
import { Chart, AxisOptions } from "react-charts";
import useChartConfig from "./useDemoConfig.tsx";
import ResizableBox from "./ResizableBox.js";

type MyDatum = { date: Date; stars: number };

const data = [
  {
    label: "React Charts",
    data: [
      {
        date: new Date(),
        stars: 23467238,
      },
      {
        date: new Date(),
        stars: 1315111,
      },
      {
        date: new Date(),
        stars: 1245547,
      },
      {
        date: new Date(),
        stars: 6544984,
      },
      {
        date: new Date(),
        stars: 846656,
      },
      {
        date: new Date(),
        stars: 4454516,
      },
    ],
  },
];

function Bar() {
  const { data, randomizeData } = useChartConfig({
    series: 1,
    dataType: "ordinal",
  });

  console.log(data);

  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      {/* <ResizableBox> */}
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      {/* </ResizableBox> */}
    </>
  );
}

function MyChart() {
  const primaryAxis = React.useMemo(
    (): AxisOptions<MyDatum> => ({
      getValue: (datum) => datum.date,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<MyDatum>[] => [
      {
        getValue: (datum) => datum.stars,
      },
    ],
    []
  );

  return (
    <ResizableBox >
      <Bar />
    </ResizableBox>
  );
}

export default MyChart;