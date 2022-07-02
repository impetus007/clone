import React, { useState, useEffect } from "react";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
import "./calendar.css";
import "./material.css";
import { useDataLayerValue } from "../../DataLayer/DataLayer";
import Api from "../../Api/axios";

const UserCalendar = () => {
  const [{ userDetails, class_teacher_class_details }, dispatch] =
    useDataLayerValue();
  const [calendarData, setCalendarData] = useState([]);
  //- To change default fields name to cutom names
  let classTeacherFlag = true;
  let mapMonth = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
  };

  useEffect(() => {
    // console.log("userDetails", userDetails)
    async function fetchData(url, eventType) {
      await Api.get(url)
        .then((res) => {
          let responseData = res.data;
          for (const [year, yearObj] of Object.entries(responseData)) {
            let obj = yearObj;
            for (const [month, monthObj] of Object.entries(obj)) {
              let obj = monthObj;
              for (const [day, dayObj] of Object.entries(obj)) {
                let obj = dayObj;
                for (const [key, value] of Object.entries(obj)) {
                  let m = mapMonth[month.toLowerCase()];
                  let startTime = msToTime(value.event_start, "start");
                  let endTime = msToTime(value.event_end, "end");
                  let dataObj = {
                    Id: value.event_id,
                    StartTime: new Date(
                      year,
                      m,
                      day,
                      startTime.hours,
                      startTime.minutes
                    ),
                    EndTime: new Date(
                      year,
                      m,
                      day,
                      endTime.hours,
                      endTime.minutes
                    ),
                    Subject: value.event_name,
                    IsAllDay: value.is_full_day,
                    Location: value.location,
                    Description: value.meet_link,
                    EventType: eventType,
                  };
                  setCalendarData((prevState) => [
                    ...prevState,
                    { ...dataObj },
                  ]);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
    async function getDefaultData() {
      class_teacher_class_details == undefined
        ? (classTeacherFlag = false)
        : (classTeacherFlag = true);
      // console.log("classTeacherFlag", classTeacherFlag)
      fetchData("/calendar/global", "global");
      if (userDetails.userType == "TEACHER" && classTeacherFlag) {
        await Api.get(`/user/get-user?email=${userDetails.email}`)
          .then((res) => {
            let user_id = res.data?._id;
            fetchData(`/calendar?user_id=${user_id}`, "local");
          })
          .catch((err) => {
            console.log("err", err);
          });
      } else if (
        userDetails.userType == "STUDENT" ||
        userDetails.userType == "PARENT"
      ) {
        // console.log("inside student")
        fetchData(`/calendar`, "local");
      }
    }
    getDefaultData();
  }, []);

  function getKeyByValue(object, value) {
    return Object.keys(object)
      .find((key) => object[key] === value)
      .toUpperCase();
  }

  function onPopupOpen(args) {
    if (args.type === "QuickInfo" || args.type === "Editor") {
      let flag = true;
      if (userDetails.userType == "SCHOOL_ADMIN") {
        flag = false;
      } else if (userDetails.userType == "TEACHER") {
        // console.log("classTeacherFlag", classTeacherFlag)
        if (classTeacherFlag == true) {
          // console.log("Inside class teacher condition")

          let obj = calendarData.find((e) => {
            return e.Id == args.data.Id;
          });
          // console.log("obj", obj)
          if (obj?.EventType == "global") {
            flag = true;
          } else {
            flag = false;
          }

          // console.log("flag", flag)
        } else {
          let isEmptyCell =
            args.target.classList.contains("e-work-cells") ||
            args.target.classList.contains("e-header-cells"); // checking whether the cell is empty or not
          if (isEmptyCell) {
            args.cancel = true;
          }
        }
      } else if (
        userDetails.userType == "STUDENT" ||
        userDetails.userType == "PARENT" ||
        userDetails.userType == "CENTRAL" ||
        userDetails.userType == "DISTRICT"
      ) {
        let isEmptyCell =
          args.target.classList.contains("e-work-cells") ||
          args.target.classList.contains("e-header-cells"); // checking whether the cell is empty or not
        if (isEmptyCell) {
          args.cancel = true;
        }
      }
      if (args.type === "Editor") {
        let startTimeElement =
          args.element.querySelector(".e-start").ej2_instances[0];
        let subjectElement = args.element.querySelector(".e-subject");
        let locationElement = args.element.querySelector(".e-location");
        let allDayElement = args.element.querySelector(".e-all-day");
        let timeZoneElement = args.element.querySelector(".e-time-zone");
        let repeatElement = args.element.querySelector(".e-repeat");
        let descriptionElement = args.element.querySelector(".e-description");
        let endTimeElement =
          args.element.querySelector(".e-end").ej2_instances[0];
        let deleteButton = args.element.querySelector(".e-event-delete");
        let saveButton = args.element.querySelector(".e-event-save");

        subjectElement.disabled =
          locationElement.disabled =
          allDayElement.disabled =
          timeZoneElement.disabled =
          repeatElement.disabled =
          descriptionElement.disabled =
          startTimeElement.readonly =
          endTimeElement.readonly =
          deleteButton.disabled =
          saveButton.disabled =
            flag;
      } else if (args.type === "QuickInfo") {
        let editIcon = args.element.querySelector(".e-edit");
        let deleteIcon = args.element.querySelector(".e-delete");
        if (editIcon != null && deleteIcon != null) {
          editIcon.disabled = deleteIcon.disabled = flag;
        }
      }
    }
  }
  const timeToMs = (paramDate) => {
    const hrs = paramDate.getHours();
    const mins = paramDate.getMinutes();
    return hrs * 3600000 + mins * 60000;
  };
  const msToTime = (duration, flag) => {
    let timeObj = {
      hours: 0,
      minutes: 0,
    };
    if (duration == null) {
      if (flag == "end") {
        timeObj.hours = 23;
        timeObj.minutes = 59;
      }
    } else {
      let minutes = Math.floor((duration / (1000 * 60)) % 60);
      let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      timeObj.hours = hours < 10 ? 0 + hours : hours;
      timeObj.minutes = minutes < 10 ? 0 + minutes : minutes;
    }
    return timeObj;
  };
  async function actionhandler(args) {
    let requestData = {};
    let url;
    if (
      args.requestType == "eventCreated" ||
      args.requestType == "eventChanged"
    ) {
      const data = args.data[0];
      requestData = {
        day: data.StartTime.getDate().toString(),
        month: getKeyByValue(mapMonth, data.StartTime.getMonth()),
        year: data.StartTime.getFullYear().toString(),
        event_name: data.Subject,
        is_full_day: data.IsAllDay,
        event_start: timeToMs(data.StartTime),
        event_end: timeToMs(data.EndTime),
        location: data.Location,
        meet_link: data.Description,
      };
    }
    if (args.requestType == "eventCreated") {
      if (userDetails.userType == "SCHOOL_ADMIN") {
        url = "/calendar/global";
      } else if (userDetails.userType == "TEACHER") {
        url = "/calendar";
      }
      await Api.post(url, requestData)
        .then((res) => {
          // console.log("res", res.data)
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else if (args.requestType == "eventChanged") {
      const data = args.data[0];
      requestData.event_id = data.Id;
      if (userDetails.userType == "SCHOOL_ADMIN") {
        url = `/calendar/global`;
      } else if (userDetails.userType == "TEACHER") {
        url = `/calendar`;
      }
      await Api.put(url, requestData)
        .then((res) => {
          // console.log("res", res)
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else if (args.requestType == "eventRemoved") {
      const data = args.data[0];
      if (userDetails.userType == "SCHOOL_ADMIN") {
        url = `/calendar/global?id=${data.Id}`;
      } else if (userDetails.userType == "TEACHER") {
        url = `/calendar?id=${data.Id}`;
      }
      await Api.delete(url)
        .then((res) => {
          // console.log("res", res)
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }

  return (
    <div className="text-center m-20">
      <ScheduleComponent
        currentView="Month"
        selectedDate={new Date(2022, 0, 1)}
        eventSettings={{ dataSource: calendarData }}
        actionComplete={actionhandler.bind(this)}
        popupOpen={onPopupOpen.bind(this)}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};

export default UserCalendar;
