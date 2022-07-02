import { RiAdminLine } from "react-icons/ri";
import { BiLibrary } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { BsChatDots, BsPeople } from "react-icons/bs";

const reports_list = [
  {
    sub: "Sub1",
    overall_aggregate: 50,
    report_link: "#",
  },
  {
    sub: "Sub2",
    overall_aggregate: 50,
    report_link: "#",
  },
  {
    sub: "Sub3",
    overall_aggregate: 50,
    report_link: "#",
  },
  {
    sub: "Sub4",
    overall_aggregate: 60,
    report_link: "#",
  },
  {
    sub: "Sub5",
    overall_aggregate: 40,
    report_link: "#",
  },
];

const overAll_performance = [
  {
    name: "Attendance Aggregate",
    progress: 40,
  },
  {
    name: "Assessment Aggregate",
    progress: 70,
  },
  {
    name: "Quizzes Aggregate",
    progress: 60,
  },
];

// opFor : ["CENTRAL","DISTRICT","SCHOOL_ADMIN","TEACHER","STUDENT"],

const sidebarOptions = [
  {
    name: "Administrative",
    icon: <RiAdminLine />,
    opFor: ["CENTRAL", "DISTRICT", "SCHOOL_ADMIN", "TEACHER"],
    options: [
      {
        name: "User Management",
        icon: <AiOutlineUser />,
        opFor: ["CENTRAL", "DISTRICT", "SCHOOL_ADMIN"],
        options: [
          {
            name: "Add Users",
            opFor: ["CENTRAL", "DISTRICT", "SCHOOL_ADMIN"],
            options: [
              {
                name: "Add Central",
                route: "add-central",
                opFor: ["CENTRAL", "DISTRICT"],
              },
              {
                name: "Add District",
                route: "add-district",
                opFor: ["CENTRAL", "DISTRICT"],
              },
              {
                name: "Add School Admin",
                route: "add-school-admin",
                opFor: ["CENTRAL", "DISTRICT", "SCHOOL_ADMIN"],
              },
              {
                name: "Add Teacher",
                route: "add-teacher",
                opFor: ["SCHOOL_ADMIN"],
              },
              {
                name: "Add Student",
                route: "add-student",
                opFor: ["SCHOOL_ADMIN"],
              },
              {
                name: "Add Parent",
                route: "add-parent",
                opFor: ["SCHOOL_ADMIN"],
              },
            ],
          },
          {
            name: "Show Users",
            opFor: ["CENTRAL", "DISTRICT", "SCHOOL_ADMIN"],
            options: [
              {
                name: "Show Centrals",
                route: "show-central",
                opFor: ["CENTRAL"],
              },
              {
                name: "Show Districts",
                route: "show-district",
                opFor: ["CENTRAL"],
              },
              {
                name: "Show School Admins",
                route: "show-school-admin",
                opFor: ["CENTRAL", "DISTRICT"],
              },
              {
                name: "Show Teachers",
                route: "show-teacher",
                opFor: ["CENTRAL", "DISTRICT", "SCHOOL_ADMIN"],
              },
              {
                name: "Show Students",
                route: "show-student",
                opFor: ["CENTRAL", "DISTRICT", "SCHOOL_ADMIN"],
              },
              {
                name: "Show Parents",
                route: "show-parent",
                opFor: ["CENTRAL", "DISTRICT", "SCHOOL_ADMIN"],
              },
            ],
          },
        ],
      },
      {
        name: "Attendance",
        route: "attendance",
        icon: <BsPeople />,
        opFor: ["TEACHER", "SCHOOL_ADMIN"],
      },
    ],
  },
  {
    name: "User Profile",
    route: "user-profile",
    icon: <AiOutlineUser />,
    opFor: ["CENTRAL", "DISTRICT", "SCHOOL_ADMIN", "TEACHER", "STUDENT"],
  },
  {
    name: "Learning Management",
    icon: <BiLibrary />,
    opFor: ["CENTRAL", "DISTRICT", "SCHOOL_ADMIN", "TEACHER"],
    options: [
      {
        name: "Create Class",
        route: "create-class",
        opFor: ["CENTRAL", "SCHOOL_ADMIN"],
      },
      {
        name: "Create Subject",
        route: "create-subject",
        opFor: ["CENTRAL", "SCHOOL_ADMIN"],
      },
      {
        name: "Show Classes",
        route: "show-class",
        opFor: ["CENTRAL", "DISTRICT", "SCHOOL_ADMIN"],
      },

      {
        name: "Add Content",
        route: "library",
        opFor: ["CENTRAL", "TEACHER"],
        options: [
          {
            name: "Add Chapter",
            route: "library/add-content/add-chapter",
            opFor: ["CENTRAL", "TEACHER"],
          },
          {
            name: "Add Topic",
            route: "library/add-content/add-topic",
            opFor: ["CENTRAL", "TEACHER"],
          },
          {
            name: "Add Sub Topic",
            route: "library/add-content/add-sub-topic",
            opFor: ["CENTRAL", "TEACHER"],
          },
        ],
      },
      {
        name: "Library",
        route: "library",
        opFor: ["CENTRAL", "TEACHER", "SCHOOL_ADMIN"],
      },
    ],
  },

  {
    name: "Academics",
    icon: <HiOutlineAcademicCap />,
    opFor: ["SCHOOL_ADMIN", "TEACHER", "STUDENT"],
    options: [
      {
        name: "Attendance",
        route: "attendance",
        // icon: <BsPeople />,
        opFor: ["STUDENT"],
      },
      {
        name: "Library",
        route: "library",
        opFor: ["STUDENT"],
      },
      {
        name: "Assessment",
        route: "assessment",
        opFor: ["SCHOOL_ADMIN", "TEACHER", "STUDENT"],
      },
      {
        name: "Live Classes",
        route: "live-classes",
        opFor: ["SCHOOL_ADMIN", "TEACHER", "STUDENT"],
      },
      {
        name: "Calendar",
        route: "calendar",
        opFor: ["SCHOOL_ADMIN", "TEACHER", "STUDENT"],
      },
      {
        name: "Reports",
        route: "reports",
        opFor: ["SCHOOL_ADMIN", "TEACHER", "STUDENT"],
      },

      {
        name: "Notices",
        route: "notices",
        opFor: ["SCHOOL_ADMIN", "TEACHER", "STUDENT"],
      },
      {
        name: "Create Quiz",
        route: "create-quiz",
        opFor: ["SCHOOL_ADMIN", "TEACHER"],
      },
      {
        name: "Document",
        route: "document",
        opFor: ["SCHOOL_ADMIN", "TEACHER"],
      },
      {
        name: "fees collection",
        route: "fees-collection",
        opFor: ["SCHOOL_ADMIN", "TEACHER","STUDENT"],
      },
    ],
  },
  {
    name: "Chat",
    icon: <BsChatDots />,
    opFor: ["SCHOOL_ADMIN", "TEACHER", "STUDENT"],
    options: [
      {
        name: "Chat",
        route: "chat",
        opFor: ["SCHOOL_ADMIN", "TEACHER", "STUDENT"],
      },
    ],
  },
];

export const initialState = {
  name: "UIF Eschool",
  reports_list: reports_list,
  overAll_performance: overAll_performance,
  sidebarOptions: sidebarOptions,
  loading: false,
  lib_type: "SCHOOL_LIBRARY",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_LOGIN_STATUS":
      return {
        ...state,
        loggedIn: action.loggedIn,
      };
    case "SET_CLASSROOMS":
      return {
        ...state,
        classrooms: action.classrooms,
      };
    case "SET_USER_DETAILS":
      return {
        ...state,
        userDetails: action.userDetails,
      };
    case "SET_SIDEBAR_OPTION":
      return {
        ...state,
        sidebarOptions: action.sidebarOptions,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      };
    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        errMess: action.errMess,
      };
    case "SET_CLASS_TEACHER_CLASS_DETAILS":
      return {
        ...state,
        class_teacher_class_details: action.class_teacher_class_details,
      };
    case "SET_LIB_TYPE":
      return {
        ...state,
        lib_type: action.lib_type,
      };

    default:
      return state;
  }
};

export default reducer;
