import React, { useEffect, useState } from "react";
import { getdashBoard } from "../../../apis/adminapi";
import { BarChart, Bar, PieChart, Pie, Cell } from "recharts";
;

function HomeScreen() {
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [arrayorder, setArrayorder] = useState();
  const [monthReport, setmonthreport] = useState([]);
  const [data, setData] = useState(null);
  const [standard, setstandard] = useState("");
  const [basic, setbasic] = useState("");
  const [Premium, setpremium] = useState("");

  

  const now = new Date();
  const currentMonth = now.getMonth();
  const months = [];

  // Add two months before the current month
  for (let i = 2; i >= 1; i--) {
    const month = new Date(now);
    month.setMonth(currentMonth - i);
    months.push(month.toLocaleString("default", { month: "long" }));
  }

  // Add the current month
  months.push(now.toLocaleString("default", { month: "long" }));

  // Add two months after the current month
  for (let i = 1; i <= 2; i++) {
    const month = new Date(now);
    month.setMonth(currentMonth + i);
    months.push(month.toLocaleString("default", { month: "long" }));
  }

  useEffect(() => {
    if (!data) {
      getdashBoard().then((res) => {
        if (res.status === 200) {
          setPieData(res.data.data);
          setstandard(res.data.data[0]);
          setbasic(res.data.data[1]);
          setpremium(res.data.data[2]);
          setData(true);
          setmonthreport(res.data.result);
        }
      });
    }
  }, []);

  let newPieData = [];

  useEffect(() => {
    // Generate random data for the bar graph

    if (data) {
      const newBarData = [];
      for (let i = 0; i < 5; i++) {
        newBarData.push({
          name: `Bar ${i}`,
          value: monthReport[i]?.profit_count,
        });
      }
      setBarData(newBarData);

      // Generate random data for the pie chart
      const newPieData = [];
      const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
      for (let i = 0; i < pieData.length; i++) {
        newPieData.push({
          name: `Pie ${i}`,
          value: pieData[i],
          color: colors[i],
        });
      }
      setPieData(newPieData);
    } else {
    }
    return () => {
      setData(null);
      // setData(false)
    };
  }, [data]);

  return (
    <div>
      <div className="flex m-auto">
        <div className="w-full flex justify-center">
          <div className="mx-5 ">
            <h1 className="text-semibold font-semibold text-2xl mt-2">
              Monthly subscriptions{" "}
            </h1>
            <div></div>
            <div className="ml-10 flex">
              <div className="">
                <BarChart width={400} height={300} data={barData}>
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
                <div className="flex -ml-5">
                  {monthReport.map((data,index) => (
                    <h1 key={index} className=" ml-8">{data.month}</h1>
                  ))}
                </div>
              </div>

              <div className="flex mt-10">
                <div className=" -ml-3 ">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr className="">
                        <th className="p-3 text-sm font-semibold tracking-wide text-left">
                          month
                        </th>

                        <th className="p-3 text-sm font-semibold tracking-wide text-left">
                          Subscription
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthReport.map((data,index) => (
                        <tr>
                          <td key={index} className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            {data.month}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            {data.profit_count}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* <div className=' -ml-3'>
      {monthReport.map((entry, index) => (
            <>
            <h1 className='ml-10'>{entry.profit_count}</h1>
            </>
          ))}
          </div> */}
              </div>
            </div>

            <div className="flex justify-around pt-8 ">
              <div className="justify-center ">
                <h1 className="text-2xl font-bold">Subscription Type </h1>
                <div className="flex pt-4">
                  <h1 className="text-blue-700 font-bold text-lg">
                    Standard :{" "}
                  </h1>

                  <h1 className="text-lg pl-2">{standard}</h1>
                </div>
                <div className="flex">
                  <h1 className="text-yellow-500 font-bold text-lg">
                    Basic :{" "}
                  </h1>

                  <h1 className="text-lg pl-2">{basic}</h1>
                </div>
                <div className="flex">
                  <h1 className="text-emerald-400 font-bold text-lg">
                    Premium :{" "}
                  </h1>

                  <h1 className="text-lg pl-2">{Premium}</h1>
                </div>
              </div>

              <PieChart width={400} height={300}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx={250}
                  cy={150}
                  innerRadius={60}
                  outerRadius={100}
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {pieData.map((entry, index) => (
                    <>
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    </>
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
