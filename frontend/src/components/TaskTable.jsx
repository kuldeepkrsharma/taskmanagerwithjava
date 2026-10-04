import { useState } from "react";
import { TiArrowDownThick, TiArrowUpThick } from "react-icons/ti";
import { MdOutlinePendingActions } from "react-icons/md";
import { LuCircleCheckBig } from "react-icons/lu";
import { LuFilePlus2 } from "react-icons/lu";
import { PiSpinnerBallFill } from "react-icons/pi";
import { LuTriangleAlert } from "react-icons/lu";

export default function TaskTable({ tasks, loading, error }) {
  const [sortbyitem, setsortbyitem] = useState("ID");
  const [ascending, setascending] = useState(true);

  if (loading) {
    return (
      <div className="state-message">
        <div>
          <img src="https://zenox.lol/loaders/dog-dance.gif" width={100} />
          {/* <PiSpinnerBallFill className="spin" size={50} /> */}
          <br />
        </div>
        Finding today's workload
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-message error">
        <div>
          <LuTriangleAlert size={50} />
        </div>
        Something went wrong while loading tasks. Please try again after
        sometime.
        {/* Error: {error} */}
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return <div className="state-message">No tasks found.</div>;
  }
  // Sort Item on click on any coloumn
  function sortitem(sortby) {
    if (sortby === sortbyitem) {
      setascending((prev) => !prev);
    } else {
      setsortbyitem(sortby);
      setascending(true);
    }
  }

  function getSortedTasks() {
    const sortedTasks = [...tasks];

    sortedTasks.sort((a, b) => {
      let valueA;
      let valueB;

      switch (sortbyitem) {
        case "ID":
          valueA = a.id;
          valueB = b.id;
          break;

        case "Title":
          valueA = a.title;
          valueB = b.title;
          break;

        case "Status":
          valueA = b.status;
          valueB = a.status;
          break;

        case "Priority":
          valueA = a.priority;
          valueB = b.priority;
          break;

        case "Assignee":
          valueA = a.assignee || "";
          valueB = b.assignee || "";
          break;

        default:
          return 0;
      }

      // String sorting
      if (typeof valueA === "string") {
        return ascending
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      // Number sorting
      return ascending ? valueA - valueB : valueB - valueA;
    });

    return sortedTasks;
  }

  const sortedTasks = getSortedTasks();

  return (
    <table className="task-table">
      <thead>
        <tr title="Click on heading to view in sorted manner">
          <th onClick={() => sortitem("ID")}>
            ID
            <span className="th-icon">
              {ascending === true ? (
                <TiArrowDownThick
                  className={sortbyitem === "ID" ? "block" : "hidden"}
                  size={12}
                />
              ) : (
                <TiArrowUpThick
                  className={sortbyitem === "ID" ? "block" : "hidden"}
                  size={12}
                />
              )}
            </span>
          </th>

          <th onClick={() => sortitem("Title")}>
            Title
            <span className="th-icon">
              {ascending === true ? (
                <TiArrowDownThick
                  className={sortbyitem === "Title" ? "block" : "hidden"}
                  size={12}
                />
              ) : (
                <TiArrowUpThick
                  className={sortbyitem === "Title" ? "block" : "hidden"}
                  size={12}
                />
              )}
            </span>
          </th>

          <th onClick={() => sortitem("Status")}>
            Status
            <span className="th-icon">
              {ascending === true ? (
                <TiArrowDownThick
                  className={sortbyitem === "Status" ? "block" : "hidden"}
                  size={12}
                />
              ) : (
                <TiArrowUpThick
                  className={sortbyitem === "Status" ? "block" : "hidden"}
                  size={12}
                />
              )}
            </span>
          </th>

          <th onClick={() => sortitem("Priority")}>
            Priority
            <span className="th-icon">
              {ascending === true ? (
                <TiArrowDownThick
                  className={sortbyitem === "Priority" ? "block" : "hidden"}
                  size={12}
                />
              ) : (
                <TiArrowUpThick
                  className={sortbyitem === "Priority" ? "block" : "hidden"}
                  size={12}
                />
              )}
            </span>
          </th>

          <th onClick={() => sortitem("Assignee")}>
            Assignee
            <span className="th-icon">
              {ascending === true ? (
                <TiArrowDownThick
                  className={sortbyitem === "Assignee" ? "block" : "hidden"}
                  size={12}
                />
              ) : (
                <TiArrowUpThick
                  className={sortbyitem === "Assignee" ? "block" : "hidden"}
                  size={12}
                />
              )}
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        {sortedTasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>

            <td>
              <div className="task-title">{task.title}</div>
              <div className="task-desc">{task.description}</div>
            </td>

            <td title={task.status}>
              <span
                className={`status-badge td-icon ${task.status.toLowerCase()}`}
              >
                {task.status.toLowerCase() == "open" && (
                  <LuFilePlus2 size={20} />
                )}
                {task.status.toLowerCase() == "done" && (
                  <LuCircleCheckBig size={20} />
                )}
                {task.status.toLowerCase() == "in_progress" && (
                  <MdOutlinePendingActions size={20} />
                )}
              </span>
            </td>

            <td className="" title={task.priority}>
              <div className="td-icon">
                {task.priority.toLowerCase() == "high" && (
                  <LuTriangleAlert size={20} color="red" />
                )}
                {task.priority.toLowerCase() == "medium" && (
                  <LuTriangleAlert size={20} color="orange" />
                )}
                {task.priority.toLowerCase() == "low" && (
                  <LuTriangleAlert size={20} />
                )}
              </div>
            </td>

            <td>{task.assignee || "\u2014"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
