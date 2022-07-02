import React, { useEffect, useState } from "react";
import "./body.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Assesment from "../Assesment/Assesment";
import User_profile from "../User_Profile/Student-User-Profile/User_profile";
import User_Edit from "../User_Profile/Student-User-Profile/User_Edit";

// Imports for notices
import NoticesStudent from "../Notices/Notices_Student/Notices_Student";
import Notices_Teacher from "../Notices/Notices_Teacher/Notices_Teacher";
import Notices_Admin from "../Notices/Notices_Admin/Notices_Admin";
import Notices_Admin_Create from "../Notices/Notices_Admin/Notices_Admin_Create";
import Notices_Teacher_Create from "../Notices/Notices_Teacher/Notices_Teacher_Create";

// imports for live classes
import LiveClasses_Student from "../LiveClasses/LiveClasses_Student/LiveClasses_Student";
import LiveClasses_Admin from "../LiveClasses/LiveClasses_Admin/LiveClasses_Admin";
import LiveClasses_Teacher from "../LiveClasses/LiveClasses_Teacher/LiveClasses_Teacher";

// imports for dashboards
import Admin_Dashboard from "../Dashboard/Admin_Dashboard/Admin_Dashboard";
import Teacher_Dashboard from "../Dashboard/Teacher_Dashboard/Teacher_Dashboard";
import Student_Dashboard from "../Dashboard/Student_Dashboard/Student_Dashboard";

//import fees collection

import AdminFeesCollection from "../FeeCollection/Admin_Fee_Collection/AdminfeeCollection";
import Add_details from "../FeeCollection/Admin_Fee_Collection/Add-details/Add_details";
import Complete_details from "../FeeCollection/Admin_Fee_Collection/Complete_details/Complete_details";
import Student_fees_collection from "../FeeCollection/Student_Fee_Collection/Student_Fee_Collection";

// documents 
import Document from "../Document/Document";
import Adddocument from "../Document/AddDocument/Adddocument";
import Academic from "../Document/Academic/Academic"

// Imports for reports
import Student_Reports from "../Reports/Student_Reports/Student_Reports";
import ReportsInner from "../Reports/Student_Reports/ReportsInner/ReportsInner";
import Treports from "../Reports/Teacher_Reaports/Treports";
import Myreport from "../Reports/Teacher_Reaports/My_report";
import Evalution from "../Reports/Teacher_Reaports/Evalution";
import Gevalution from "../Reports/Teacher_Reaports/Go_To_Evalution/Go_to_evalution";
import ADash from "../Reports/Teacher_Reaports/Go_To_Evalution/Assess/Assessment_dash";
import Student from "../Reports/Teacher_Reaports/Go_To_Evalution/Assess/Student/Student";
import Over from "../Reports/Teacher_Reaports/Go_To_Evalution/Over_All/Over_All";
import Areports from "../Reports/Admin-Reports/Admin_reports";
import CEvollution from "../Reports/Admin-Reports/Class/CEvollution";
import SEvolution from "../Reports/Admin-Reports/School/SEvolution";
import TEvolution from "../Reports/Admin-Reports/Teacher/TEvolution";
import GAEvolution from "../Reports/Admin-Reports/Class/Go-to-AEvlution/Go_to_AEvolution";
import Admin_Assess from "../Reports/Admin-Reports/Class/Go-to-AEvlution/Admin-Assess/Admin_Assess";
import Admin_overAll from "../Reports/Admin-Reports/Class/Go-to-AEvlution/Admin-overall/Admin_overAll";
import AStudent from "../Reports/Admin-Reports/Class/Go-to-AEvlution/Admin-Assess/Admin-Student/AStudent";

// Imports for Library
import Tlibrary from "../Library/Teacher_Library/Tlibrary";
import Ucontent from "../Library/Teacher_Library/Uploaded_content/Uploaded_content";
import School_Admin_Library from "../Library/School_Admin_Library/School_Admin_Library";
import Slibrary from "../Library/Student_Library/Slibrary";
import Slibrary_Topicwise from "../Library/Student_Library/Slibrary_Topicwise";
import ContentPlayer from "../Library/ContentPlayer/ContentPlayer";
import School_Admin_Library_Lib from "../Library/School_Admin_Library/School_Admin_Library_Lib";
import ShowSubjects from "../Show/ShowSubjects";
import AddChapter from "../Library/Teacher_Library/NewContent/AddChapter";
import AddTopic from "../Library/Teacher_Library/NewContent/AddTopic";
import AddSubTopic from "../Library/Teacher_Library/NewContent/AddSubTopic";
import School_Admin_Library_Content_Comp from "../Library/School_Admin_Library/School_Admin_Library_Content_Comp";
import School_Admin_Library_Student_Wise_Progress from "../Library/School_Admin_Library/School_Admin_Library_Student_Wise_Progress";
import Create_Inhouse_Class from "../Library/InHouse_Library/Create_Inhouse_class";
import Create_Inhouse_Subject from "../Library/InHouse_Library/Create_Inhouse_Subject";
import Add_Inhouse_Chapter from "../Library/InHouse_Library/Add_Inhouse_Chapter";
import Add_Inhouse_Topic from "../Library/InHouse_Library/Add_Inhouse_Topic";
import Add_Inhouse_Subtopic from "../Library/InHouse_Library/Add_Inhouse_Subtopic";
import Inhouse_Library from "../Library/InHouse_Library/InHouse_Library_Lib/Inhouse_Library";
import Inhouse_Library_Lib from "../Library/InHouse_Library/InHouse_Library_Lib/Inhouse_Library_Lib";

// Imports for Attendance
import Teacher_Attendance from "../Attendance/Teacher_Attendance/Teacher_Attendance";
import Prev_Attendance from "../Attendance/Teacher_Attendance/Prev_Attendance/Prev_Attendance";
import Admin_Attendance from "../Attendance/Admin_Attendance/Admin_Attendance";
import Ad_Teacher_Attendance from "../Attendance/Admin_Attendance/Admin_Teacher_Attendance/Ad_Teacher_Attendance";
import Admin_Teacher_Prev_Attendance from "../Attendance/Admin_Attendance/Admin_Teacher_Prev_Attendance/Admin_Teacher_Prev_Attendance";
import Student_Attendance from "../Attendance/Student_Attendance/Student_Attendance";

// Imports for Adding Users and creating classes
import AddCentral from "../Add/AddCentral";
import AddDistrict from "../Add/AddDistrict";
import AddSchoolAdmin from "../Add/AddSchoolAdmin";
import AddTeacher from "../Add/AddTeacher";
import AddStudent from "../Add/AddStudent";
import AddParent from "../Add/AddParent";
import CreateClass from "../Add/CreateClass";

// Imports for Showing Users and Classes
import ShowCentral from "../Show/ShowCentrals";
import ShowDistrict from "../Show/ShowDistricts";
import ShowSchoolAdmin from "../Show/ShowSchoolAdmins";
import ShowTeacher from "../Show/ShowTeachers";
import ShowStudent from "../Show/ShowStudents";
import ShowParent from "../Show/ShowParents";
import ShowClasses from "../Show/ShowClasses";

// Imports for Login
import Login from "../Login/Login";

// Imports for Chat section
import ChatTeacher from "../Chat/ChatTeacher";
import ChatStudent from "../Chat/ChatStudent";
import ChatAdmin from "../Chat/ChatAdmin";

// Imports for calendar
import UserCalendar from "../Calendar/UserCalendar";

// Imports for LMS
import CreateSubject from "../Add/CreateSubject";

// Other important imports
import { useDataLayerValue } from "../../DataLayer/DataLayer";
import NotFound from "../NotFound/NotFound";
import Quiz from "../Quiz/Quiz";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";


function Body() {
  const [
    { user, userDetails, initialState, loggedIn, class_teacher_class_details },
  ] = useDataLayerValue();
  const [forWhom, setForWhom] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [routePermissionInfo, setRoutePermissionInfo] = useState({
    CRUD: {
      centralCRUD: false,
      districtCRUD: false,
      schoolAdminCRUD: false,
      teacherCRUD: false,
      studentCRUD: false,
      parentCRUD: false,
      classCRUD: false,
    },
    OTHERS: {
      dashboard: undefined,
      attendance: undefined,
      library: undefined,
      assessment: undefined,
      liveClasses: undefined,
      forum: undefined,
      calendar: undefined,
      reports: undefined,
      fee: undefined,
      documents: undefined,
      notices: undefined,
      quiz: undefined,
    },
  });

  // Selecting dashboard based on usertype and setting route permissions

  useEffect(() => {
    setRoutePermissionInfoFunc();
  }, [userDetails, class_teacher_class_details]);

  const setRoutePermissionInfoFunc = () => {
    switch (userDetails?.userType || initialState?.userDetails.userType) {
      case "TEACHER":
        setForWhom("Teacher");
        setRoutePermissionInfo((prevState) => ({
          ...prevState,
          OTHERS: {
            ...prevState.OTHERS,
            dashboard: <Teacher_Dashboard />,
            attendance: class_teacher_class_details ? (
              <Teacher_Attendance />
            ) : (
              <NotFound />
            ),
            reports: <Treports />,
            library: <Tlibrary />,
            assessment: undefined,
            liveClasses: <LiveClasses_Teacher />,
            documents: undefined,
            notices: <Notices_Teacher />,
            quiz: <Quiz />,
            createClass: <CreateClass />,
            chat: <ChatTeacher />,
            calendar: <UserCalendar />,
          },
        }));
        break;
      case "STUDENT":
        setForWhom("Student");
        setRoutePermissionInfo((prevState) => ({
          ...prevState,
          OTHERS: {
            ...prevState.OTHERS,
            dashboard: <Student_Dashboard />,
            attendance: <Student_Attendance />,
            reports: <Student_Reports />,
            library: <Slibrary />,
            assessment: undefined,
            liveClasses: <LiveClasses_Student />,
            notices: <NoticesStudent />,
            quiz: <Quiz />,
            chat: <ChatStudent />,
            calendar: <UserCalendar />,
          },
        }));
        break;
      case "SCHOOL_ADMIN":
        setForWhom("School Admin");
        setRoutePermissionInfo((prevState) => ({
          ...prevState,
          CRUD: {
            ...prevState.CRUD,
            teacherCRUD: true,
            studentCRUD: true,
            parentCRUD: true,
            classCRUD: true,
            schoolAdminCRUD: true,
          },
          OTHERS: {
            ...prevState.OTHERS,
            dashboard: <Admin_Dashboard />,
            attendance: <Admin_Attendance />,
            reports: <Areports />,
            library: <School_Admin_Library />,
            assessment: undefined,
            liveClasses: <LiveClasses_Admin />,
            notices: <Notices_Admin />,
            quiz: <Quiz />,
            createClass: <CreateClass />,
            showClasses: <ShowClasses />,
            chat: <ChatAdmin />,
            calendar: <UserCalendar />,
            fees: <AdminFeesCollection />,
          },
        }));
        break;
      case "CENTRAL":
        setForWhom("Central");
        setRoutePermissionInfo((prevState) => ({
          ...prevState,
          CRUD: {
            ...prevState.CRUD,
            centralCRUD: true,
            districtCRUD: true,
            schoolAdminCRUD: true,
            teacherCRUD: true,
            studentCRUD: true,
            parentCRUD: true,
            classCRUD: true,
          },
          OTHERS: {
            createClass: <Create_Inhouse_Class />,
            library: <Inhouse_Library />,
          },
        }));
        break;
      case "DISTRICT":
        setForWhom("District");
        setRoutePermissionInfo((prevState) => ({
          ...prevState,
          CRUD: {
            ...prevState.CRUD,
            schoolAdminCRUD: true,
            teacherCRUD: true,
            studentCRUD: true,
            parentCRUD: true,
          },
        }));
        break;
      case "SUPER_USER":
        setForWhom("Super User");
        setRoutePermissionInfo((prevState) => ({
          ...prevState,
          CRUD: {
            ...prevState.CRUD,
            centralCRUD: true,
            districtCRUD: true,
            schoolAdminCRUD: true,
            teacherCRUD: true,
            studentCRUD: true,
            parentCRUD: true,
          },
        }));
        break;

      default:
        setForWhom("");
        break;
    }
  };

  useEffect(() => {
    if (location.pathname === "/login") {
      if (location?.state?.from) {
        navigate(location?.state?.from.pathname);
      } else {
        navigate("/");
      }
    }
  }, [loggedIn]);

  return (
    <div className="Body">
      <p className="module-for">{forWhom} Dashboard</p>
      <div className="body-content">
        <Routes>
          {/* Public Routes */}
          {/* Login Route */}
          <Route path="/login" element={!loggedIn ? <Login /> : <NotFound />} />

          {/* Private Routes */}

          <Route element={<ProtectedRoutes />}>
            {/* Route for Dashboard */}
            <Route
              exact
              path="/"
              element={routePermissionInfo?.OTHERS.dashboard}
            />
            <Route exact path="/user-profile" element={<User_profile />} />
            <Route path="/user-profile/Edit" element={<User_Edit />} />

            {/* Routes for chat */}
            <Route path="/chat" element={routePermissionInfo?.OTHERS.chat} />

            {/* Routes for attendance */}

            <Route
              exact
              path="/attendance"
              element={routePermissionInfo?.OTHERS.attendance}
            />

            <Route
              exact
              path="/attendance/prev-attendance"
              element={
                userDetails?.userType === "TEACHER" ? (
                  <Prev_Attendance />
                ) : (
                  <NotFound />
                )
              }
            />

            <Route
              exact
              path="/attendance/teacher_attendance"
              element={
                userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <Ad_Teacher_Attendance />
                ) : (
                  <NotFound />
                )
              }
            />

            {/* fees collection */}
            <Route
              exact
              path="/fees-collection"
              element={
                userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <AdminFeesCollection />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              exact
              path="/fees-collection/Details"
              element={
                userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <Add_details />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              exact
              path="/fees-collection/Complete-Details"
              element={
                userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <Complete_details />
                ) : (
                  <NotFound />
                )
              }
            />
            {/* Document */}
            <Route
              exact
              path="/document"
              element={
                userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <Document />
                ) : (
                  <NotFound />
                )
              } 
              />
               <Route
              exact
              path="/document/adddocument"
              element={
                userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <Adddocument />
                ) : (
                  <NotFound />
                )
              } 
              />
               <Route
              exact
              path="/document/academic"
              element={
                userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <Academic />
                ) : (
                  <NotFound />
                )
              } 
              />




            <Route
              exact
              path="/attendance/teacher_attendance/prev-attnd"
              element={
                userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <Admin_Teacher_Prev_Attendance />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              exact
              path="/fees-collection"
              element={
                userDetails?.userType === "STUDENT" ? (
                  <Student_fees_collection />
                ) : (
                  <NotFound />
                )
              }
            />

            <Route
              path="/attendance/teacher_attendance"
              element={<Ad_Teacher_Attendance />}
            />

            {/* Route for live classes */}
            <Route
              path="/live-classes"
              element={routePermissionInfo?.OTHERS.liveClasses}
            />

            {/* { Routes for calendar} */}
            <Route
              exact
              path="/calendar"
              element={routePermissionInfo?.OTHERS.calendar}
            />

            {/* Routes for Reports */}

            <Route
              exact
              path="/reports"
              element={routePermissionInfo?.OTHERS.reports}
            />
            <Route path="/reports/subject" element={<ReportsInner />} />

            <Route path="reports/my-report" element={<Myreport />} />
            <Route path="reports/Evalution" element={<Evalution />} />
            <Route
              path="reports/Evalution/Go-Evalution"
              element={<Gevalution />}
            />
            <Route
              path="reports/Evalution/Go-Evalution/Assessment-dash"
              element={<ADash />}
            />
            <Route
              path="reports/Evalution/Go-Evalution/Student"
              element={<Student />}
            />
            <Route
              path="reports/Evalution/Go-Evalution/Over-All"
              element={<Over />}
            />

            <Route
              path="/reports/my-report"
              element={
                userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <SEvolution />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/reports/Teacher-Evalution"
              element={
                userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <TEvolution />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/reports/Class-Evalution"
              element={
                userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <CEvollution />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/reports/Evalution/Go-Admin-Evalution"
              element={
                userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <GAEvolution />
                ) : (
                  <NotFound />
                )
              }
            >
              <Route
                path="Admin-Assessment-dash"
                element={
                  userDetails?.userType === "SCHOOL_ADMIN" ? (
                    <Admin_Assess />
                  ) : (
                    <NotFound />
                  )
                }
              />
              <Route
                path="Admin-Over-All"
                element={
                  userDetails?.userType === "SCHOOL_ADMIN" ? (
                    <Admin_overAll />
                  ) : (
                    <NotFound />
                  )
                }
              />
              <Route
                path="Admin-Student"
                element={
                  userDetails?.userType === "SCHOOL_ADMIN" ? (
                    <AStudent />
                  ) : (
                    <NotFound />
                  )
                }
              />
            </Route>

            {/* Route for notices */}

            <Route
              exact
              path="/notices"
              element={
                userDetails?.userType === "TEACHER" ? (
                  <Notices_Teacher />
                ) : userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <Notices_Admin />
                ) : (
                  <NoticesStudent />
                )
              }
            />
            <Route
              path="/notices/create-notice"
              element={
                userDetails?.userType === "TEACHER" &&
                class_teacher_class_details !== undefined ? (
                  <Notices_Teacher_Create />
                ) : userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <Notices_Admin_Create />
                ) : (
                  <NotFound />
                )
              }
            />

            {/* Routes for Libraries */}

            <Route
              path="/library"
              element={routePermissionInfo?.OTHERS.library}
            />

            <Route
              path="/library"
              element={
                userDetails?.userType === "TEACHER" ? (
                  <Ucontent />
                ) : userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <NotFound />
                ) : (
                  <NotFound />
                )
              }
            />

            <Route
              path="/library/Uploaded-content"
              element={
                userDetails?.userType === "TEACHER" ? (
                  <Ucontent />
                ) : (
                  <NotFound />
                )
              }
            />

            <Route
              path="/library/add-content/add-chapter"
              element={
                userDetails?.userType === "TEACHER" ? (
                  <AddChapter />
                ) : userDetails?.userType === "CENTRAL" ? (
                  <Add_Inhouse_Chapter />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/library/add-content/add-topic"
              element={
                userDetails?.userType === "TEACHER" ? (
                  <AddTopic />
                ) : userDetails?.userType === "CENTRAL" ? (
                  <Add_Inhouse_Topic />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/library/add-content/add-sub-topic"
              element={
                userDetails?.userType === "TEACHER" ? (
                  <AddSubTopic />
                ) : userDetails?.userType === "CENTRAL" ? (
                  <Add_Inhouse_Subtopic />
                ) : (
                  <NotFound />
                )
              }
            />

            <Route
              path="/library/topicwise/:classroom_id/:subject_id"
              element={
                userDetails?.userType === "STUDENT" ? (
                  <Slibrary_Topicwise />
                ) : userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <NotFound />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/library/:classroomId/:subjectId"
              element={
                userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <School_Admin_Library_Lib />
                ) : userDetails?.userType === "CENTRAL" ? (
                  <Inhouse_Library_Lib />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/library/progress/:classroomId/:subjectId"
              element={
                userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <School_Admin_Library_Content_Comp />
                ) : userDetails?.userType === "STUDENT" ? (
                  <NotFound />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/library/progress/student-wise/:classroomId/:subjectId/:chapterId"
              element={
                userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <School_Admin_Library_Student_Wise_Progress />
                ) : userDetails?.userType === "STUDENT" ? (
                  <NotFound />
                ) : (
                  <NotFound />
                )
              }
            />

            <Route
              path="/library/player/:classroomId/:subjectId/:chapterId"
              element={<ContentPlayer />}
            />

            {/* Quiz */}
            <Route
              path="/create-quiz"
              element={
                userDetails?.userType !== "STUDENT" ? <Quiz /> : <NotFound />
              }
            />

            {/* LMS */}

            <Route
              path="/create-subject"
              element={
                userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <CreateSubject />
                ) : userDetails?.userType === "CENTRAL" ? (
                  <Create_Inhouse_Subject />
                ) : (
                  <NotFound />
                )
              }
            />

            <Route
              path="/show-subjects"
              element={
                userDetails?.userType === "SCHOOL_ADMIN" ? (
                  <ShowSubjects />
                ) : (
                  <NotFound />
                )
              }
            />

            {/* Add user components */}
            <Route
              path="/add-central"
              element={
                routePermissionInfo.CRUD.centralCRUD ? (
                  <AddCentral />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/add-district"
              element={
                routePermissionInfo.CRUD.districtCRUD ? (
                  <AddDistrict />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/add-school-admin"
              element={
                routePermissionInfo.CRUD.schoolAdminCRUD ? (
                  <AddSchoolAdmin />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/add-teacher"
              element={
                routePermissionInfo.CRUD.teacherCRUD ? (
                  <AddTeacher />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/add-student"
              element={
                routePermissionInfo.CRUD.studentCRUD ? (
                  <AddStudent />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/add-parent"
              element={
                routePermissionInfo.CRUD.parentCRUD ? (
                  <AddParent />
                ) : (
                  <NotFound />
                )
              }
            />

            {/* Create Class Route */}

            <Route
              path="create-class"
              element={
                routePermissionInfo.CRUD.classCRUD ? (
                  routePermissionInfo.OTHERS.createClass
                ) : (
                  <NotFound />
                )
              }
            />

            {/* Show user components */}
            <Route
              path="/show-central"
              element={
                routePermissionInfo.CRUD.centralCRUD ? (
                  <ShowCentral />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/show-district"
              element={
                routePermissionInfo.CRUD.districtCRUD ? (
                  <ShowDistrict />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/show-school-admin"
              element={
                routePermissionInfo.CRUD.schoolAdminCRUD ? (
                  <ShowSchoolAdmin />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/show-teacher"
              element={
                routePermissionInfo.CRUD.teacherCRUD ? (
                  <ShowTeacher />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/show-student"
              element={
                routePermissionInfo.CRUD.studentCRUD ? (
                  <ShowStudent />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route
              path="/show-parent"
              element={
                routePermissionInfo.CRUD.parentCRUD ? (
                  <ShowParent />
                ) : (
                  <NotFound />
                )
              }
            />

            <Route
              path="/show-class"
              element={
                routePermissionInfo.CRUD.classCRUD ? (
                  <ShowClasses />
                ) : (
                  <NotFound />
                )
              }
            />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default Body;
