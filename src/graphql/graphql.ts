/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian calendar.
   */
  DateTime: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
};

export type AnnouncementMessage = {
  __typename?: 'AnnouncementMessage';
  /** The text to display on the button */
  buttonLabel?: Maybe<Scalars['String']['output']>;
  /** When the announcement should stop being displayed */
  endTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  /** A link to the resource of the announcement */
  link?: Maybe<Scalars['String']['output']>;
  /** The announcements body text/longer form message */
  message: Scalars['String']['output'];
  /** When the announcement should start being displayed */
  startTime: Scalars['DateTime']['output'];
  /** The announcements title/header text */
  title: Scalars['String']['output'];
  type: AnnouncementMessageType;
};

/** Describes the type of an announcement message that gets rendered */
export enum AnnouncementMessageType {
  Error = 'error',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
}

export type Assessment = {
  __typename?: 'Assessment';
  assessmentProtocol?: Maybe<Scalars['String']['output']>;
  assessmentStatus?: Maybe<AssessmentStatus>;
  assessmentStyle: AssessmentStyle;
  assessmentType: AssessmentType;
  assessor?: Maybe<User>;
  assistant?: Maybe<User>;
  /** Indicates whether or not this assessment is an early registration */
  canEarlyAssess?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  earlyAssessmentProposal?: Maybe<Scalars['String']['output']>;
  event?: Maybe<Event>;
  examinationForms: Array<ExaminationForm>;
  examinationOfficeNotes?: Maybe<Scalars['String']['output']>;
  externalFeedback?: Maybe<Scalars['String']['output']>;
  grade?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  internalNotes?: Maybe<Scalars['String']['output']>;
  /** Get the latest attempt on the module linked to this assessment */
  latestAttempt?: Maybe<Assessment>;
  learningUnit?: Maybe<EventGroup>;
  /** Status of this assessment indicated to ... */
  manageStatus?: Maybe<Scalars['String']['output']>;
  module?: Maybe<Module>;
  permissions: AssessmentPermissions;
  /** List all previous attempts on the module linked to this assessment */
  previousAttempts?: Maybe<Array<Assessment>>;
  project?: Maybe<Project>;
  proposalStatus: ProposalStatus;
  proposalText?: Maybe<Scalars['String']['output']>;
  proposedDate?: Maybe<Scalars['DateTime']['output']>;
  published?: Maybe<Scalars['Boolean']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  readyForPublishing?: Maybe<Scalars['Boolean']['output']>;
  requiresScheduling?: Maybe<Scalars['Boolean']['output']>;
  semester?: Maybe<Semester>;
  semesterModule?: Maybe<SemesterModule>;
  submittedOn: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userHandins?: Maybe<Array<Maybe<UserHandin>>>;
  workflowStatus: WorkflowStatus;
};

export type AssessmentCreateInput = {
  assessmentType?: InputMaybe<AssessmentType>;
  eventGroupId?: InputMaybe<Scalars['ID']['input']>;
  examinationForms?: InputMaybe<Array<ExaminationForm>>;
  projectId?: InputMaybe<Scalars['ID']['input']>;
  proposalText?: InputMaybe<Scalars['String']['input']>;
};

export type AssessmentDetailsEditInput = {
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  examinationOfficeNotes?: InputMaybe<Scalars['String']['input']>;
  externalFeedback?: InputMaybe<Scalars['String']['input']>;
  grade?: InputMaybe<Scalars['Float']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AssessmentEditInput = {
  externalFeedback?: InputMaybe<Scalars['String']['input']>;
  grade?: InputMaybe<Scalars['Float']['input']>;
  internalNotes?: InputMaybe<Scalars['String']['input']>;
};

export type AssessmentFilter = {
  /** Filter assessments by their style */
  assessmentStyle?: InputMaybe<AssessmentStyle>;
  /** Filter assessments by their type */
  assessmentType?: InputMaybe<AssessmentType>;
  /** Filter assessments by assessor */
  assessor?: InputMaybe<Scalars['ID']['input']>;
  /** Filter assessments by their event's date */
  date?: InputMaybe<Scalars['String']['input']>;
  /** Filter assessments by grade(fail or not fail) */
  grade?: InputMaybe<Scalars['String']['input']>;
  /** Filter assessments by module(s) */
  modules?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Fulltext search string */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Filter assessments by semester */
  semester?: InputMaybe<Scalars['ID']['input']>;
  /** Filter assessments by semester module */
  semesterModule?: InputMaybe<Scalars['ID']['input']>;
  /** Filter assessments by status */
  status?: InputMaybe<AssessmentStatus>;
  /** Filter assessments by assessed student */
  student?: InputMaybe<Scalars['ID']['input']>;
  /** Computed Status indicating the state the assessment is in at the moment */
  workflowStatus?: InputMaybe<WorkflowStatus>;
};

export type AssessmentInput = {
  addModuleHandins?: InputMaybe<Scalars['Boolean']['input']>;
  assessmentStatus?: InputMaybe<AssessmentStatus>;
  assessmentStyle: AssessmentStyle;
  assessmentType: AssessmentType;
  assessor: Scalars['ID']['input'];
  assistant?: InputMaybe<Scalars['ID']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  examinationOfficeNotes: Scalars['String']['input'];
  externalFeedback?: InputMaybe<Scalars['String']['input']>;
  grade?: InputMaybe<Scalars['Float']['input']>;
  internalNotes?: InputMaybe<Scalars['String']['input']>;
  learningUnit?: InputMaybe<Scalars['ID']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  project?: InputMaybe<Scalars['ID']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  readyForPublishing?: InputMaybe<Scalars['Boolean']['input']>;
  registrationStatus: ProposalStatus;
  remoteLocation?: InputMaybe<Scalars['String']['input']>;
  semester: Scalars['ID']['input'];
  semesterModule: Scalars['ID']['input'];
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  student: Scalars['ID']['input'];
  submittedOn?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AssessmentPermissions = {
  __typename?: 'AssessmentPermissions';
  canAssess?: Maybe<Scalars['Boolean']['output']>;
  canManage?: Maybe<Scalars['Boolean']['output']>;
  isBeingAssessed?: Maybe<Scalars['Boolean']['output']>;
};

export type AssessmentProposalInput = {
  assistantId?: InputMaybe<Scalars['ID']['input']>;
  examinationForms?: InputMaybe<Array<InputMaybe<ExaminationForm>>>;
  handinDeadline?: InputMaybe<Scalars['DateTime']['input']>;
  handinId?: InputMaybe<Scalars['ID']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  remoteLocation?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Includes the number of not yet published assessments, categorized by type */
export type AssessmentStatistics = {
  __typename?: 'AssessmentStatistics';
  /** Number of alternative assessment registrations */
  alternativeRegistrations?: Maybe<Scalars['Int']['output']>;
  /** Number of foundation assessment registrations */
  foundationRegistrations?: Maybe<Scalars['Int']['output']>;
  /** Number of assessments that still need approval by the coordinator */
  openAlternativeProposals?: Maybe<Scalars['Int']['output']>;
  /** Number of standard assessment registrations */
  standardRegistrations?: Maybe<Scalars['Int']['output']>;
  /** Number of sts assessment registrations */
  stsRegistrations?: Maybe<Scalars['Int']['output']>;
};

/** Possible stati for `Assessment` end stages */
export enum AssessmentStatus {
  /**
   * The student has not handed in the required materials and further review is
   * required to see whether they were excused or not
   */
  Absent = 'ABSENT',
  /**
   * Even though the student has failed to hand in the requried materials/appear in
   * the oral assesment, they were excused and as such the assessment is not
   * counted against their maximum tries
   */
  Excused = 'EXCUSED',
  /**
   * The student failed to provide the requested assesment materials/appear in
   * person without providing a valid excuse. As such the assessment is an automtic fail
   */
  NotExcused = 'NOT_EXCUSED',
  /** The student has handed in all needed assessment materials and/or was present at the oral assessment */
  Present = 'PRESENT',
}

/** Possible `Assessment` styles, representing the different ways of regsitering/applying for an `Assessment` */
export enum AssessmentStyle {
  Alternative = 'ALTERNATIVE',
  Foundation = 'FOUNDATION',
  Standard = 'STANDARD',
  Sts = 'STS',
}

/** Possible types of assessments, mostly relevant for `Assessment`s happening outside the regular phases */
export enum AssessmentType {
  Early = 'EARLY',
  LevelUp = 'LEVEL_UP',
  Normal = 'NORMAL',
  PriorLearning = 'PRIOR_LEARNING',
  Reassessment = 'REASSESSMENT',
}

export type AuditEntry = {
  __typename?: 'AuditEntry';
  affectedResource: Scalars['String']['output'];
  after?: Maybe<Scalars['JSON']['output']>;
  author: Scalars['String']['output'];
  before?: Maybe<Scalars['JSON']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  method: AuditMethod;
  source: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** Possible Methods an Audit Entry can be caused by */
export enum AuditMethod {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE',
}

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']['output']>;
};

export type CarryOverProjectInput = {
  coverUrl?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  isLookingForTeammates: Scalars['Boolean']['input'];
  outline: Scalars['String']['input'];
  projectId: Scalars['ID']['input'];
  sponsor?: InputMaybe<Scalars['ID']['input']>;
  tags: Array<Scalars['String']['input']>;
  teamMembers: Array<ProjectTeamMemberInput>;
  title: Scalars['String']['input'];
};

/** Represents the data for a compulsory elective group */
export type CompulsoryElectiveGroupData = {
  __typename?: 'CompulsoryElectiveGroupData';
  /** The ECTS collected for this group */
  counted: Scalars['Float']['output'];
  /** The list of module codes */
  moduleCodes: Array<Scalars['String']['output']>;
  /** The ECTS required for this group */
  required: Scalars['Float']['output'];
};

export type CreateProjectInput = {
  coverUrl?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  isLookingForTeammates: Scalars['Boolean']['input'];
  outline: Scalars['String']['input'];
  projectType?: InputMaybe<ProjectType>;
  semesters: Array<Scalars['String']['input']>;
  sponsor?: InputMaybe<Scalars['ID']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  teamMembers: Array<ProjectTeamMemberInput>;
  title: Scalars['String']['input'];
};

export type Department = {
  __typename?: 'Department';
  abbreviation: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** Statistic that holds information about some particular ects that was collected within a semester/period */
export type EctsStatistic = {
  __typename?: 'EctsStatistic';
  /** The amount of ects credits that were collected */
  count?: Maybe<Scalars['Float']['output']>;
  /** The percent the collected ects credits represent out of the total ects required to graduate */
  percent?: Maybe<Scalars['Float']['output']>;
  /** The semester the ects were collected in */
  semester?: Maybe<Scalars['String']['output']>;
};

export type Event = {
  __typename?: 'Event';
  allDay?: Maybe<Scalars['Boolean']['output']>;
  /** Whether or not the currently logged in user can join this event */
  canJoin: Scalars['Boolean']['output'];
  /** Whether or not the currently logged in user can leave this event */
  canLeave: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  creatorEmail: Scalars['String']['output'];
  description: Scalars['String']['output'];
  endTime: Scalars['DateTime']['output'];
  /** Event group containin this event */
  eventGroup?: Maybe<EventGroup>;
  eventGroupId?: Maybe<Scalars['String']['output']>;
  /** Host of this event */
  host?: Maybe<User>;
  iCalUid: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Whether or not the currently logged in user edit the attendance data of this event */
  isHost?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  /** Get details of the next event within the container event group that will be happening */
  nextEventForGroup?: Maybe<EventGroup>;
  remoteLocation?: Maybe<Scalars['String']['output']>;
  /** List of users not attending this event */
  signedOutMembers: Array<User>;
  startTime: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EventGroup = {
  __typename?: 'EventGroup';
  /** Whether or not the current user can edit this event group */
  canEdit: Scalars['Boolean']['output'];
  /** Whether or not the current user can register for this event group */
  canRegister: Scalars['Boolean']['output'];
  /** Whether or not the current user can leave this event group */
  canUnregister: Scalars['Boolean']['output'];
  category?: Maybe<EventGroupCategory>;
  /** List events that are colliding with events in this event group */
  collidingEvents?: Maybe<Array<Event>>;
  createdAt: Scalars['DateTime']['output'];
  department?: Maybe<Department>;
  description: Scalars['String']['output'];
  events?: Maybe<Array<Event>>;
  /** Number of events in this event group which have not taken place yet */
  futureEventCount: Scalars['Int']['output'];
  googleSpaceLink?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  /** Whether or not this event group is full */
  isEventFull: Scalars['Boolean']['output'];
  isHidden?: Maybe<Scalars['Boolean']['output']>;
  /** Whether or not the current user is an organizer for this event group */
  isHost: Scalars['Boolean']['output'];
  /** Whether or not the current user is in the waiting list of this event group */
  isInWaitingList: Scalars['Boolean']['output'];
  /** Whether or not the current user is registered for this event group */
  isRegistered: Scalars['Boolean']['output'];
  maxParticipants: Scalars['Int']['output'];
  modules: Array<SemesterModule>;
  /** Next event within this event group that is taking place */
  nextEvent?: Maybe<Event>;
  organizers: Array<User>;
  /** List organizers and hosts of this event group */
  organizersAndHosts?: Maybe<Array<User>>;
  /** Number of participants attending this event group */
  participantCount: Scalars['Int']['output'];
  participants: Array<Maybe<EventGroupParticipations>>;
  permissions: EventGroupPermissions;
  semester?: Maybe<Semester>;
  slackLink?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
  type: EventGroupType;
  updatedAt: Scalars['DateTime']['output'];
  visibility?: Maybe<EventGroupVisibility>;
};

export enum EventGroupCategory {
  Career = 'CAREER',
  Creative = 'CREATIVE',
  Culture = 'CULTURE',
  FoodAndDrink = 'FOOD_AND_DRINK',
  Games = 'GAMES',
  MoviesAndTv = 'MOVIES_AND_TV',
  Other = 'OTHER',
  Sport = 'SPORT',
  Talk = 'TALK',
  Wellbeing = 'WELLBEING',
}

export type EventGroupFilter = {
  category?: InputMaybe<EventGroupCategory>;
  department?: InputMaybe<Scalars['ID']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  hideFullEvents?: InputMaybe<Scalars['Boolean']['input']>;
  module?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  semester?: InputMaybe<Scalars['ID']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  student?: InputMaybe<Scalars['ID']['input']>;
};

export type EventGroupInput = {
  category?: InputMaybe<EventGroupCategory>;
  department?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isHidden: Scalars['Boolean']['input'];
  maxParticipants?: InputMaybe<Scalars['Int']['input']>;
  modules?: InputMaybe<Array<Scalars['String']['input']>>;
  organizers: Array<Scalars['String']['input']>;
  semesterId?: InputMaybe<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
  type: EventGroupType;
  visibility?: InputMaybe<EventGroupVisibility>;
};

export enum EventGroupParticipantsStatus {
  Joined = 'JOINED',
  WaitingList = 'WAITING_LIST',
}

export type EventGroupParticipations = {
  __typename?: 'EventGroupParticipations';
  createdAt: Scalars['DateTime']['output'];
  eventGroup?: Maybe<EventGroup>;
  id: Scalars['ID']['output'];
  participant?: Maybe<User>;
  status: EventGroupParticipantsStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type EventGroupPermissions = {
  __typename?: 'EventGroupPermissions';
  canEdit?: Maybe<Scalars['Boolean']['output']>;
  canManage?: Maybe<Scalars['Boolean']['output']>;
};

export enum EventGroupType {
  Academic = 'ACADEMIC',
  NonAcademic = 'NON_ACADEMIC',
}

export enum EventGroupVisibility {
  CoreStudent = 'CORE_STUDENT',
  OrientationStudent = 'ORIENTATION_STUDENT',
  Unrestricted = 'UNRESTRICTED',
}

export enum ExaminationForm {
  Discussion = 'DISCUSSION',
  ElectronicAttendanceRecord = 'ELECTRONIC_ATTENDANCE_RECORD',
  Interview = 'INTERVIEW',
  LectureOrPresentation = 'LECTURE_OR_PRESENTATION',
  None = 'NONE',
  OralOrPracticalExamination = 'ORAL_OR_PRACTICAL_EXAMINATION',
  ProjectPortfolio = 'PROJECT_PORTFOLIO',
  WrittenElaboration = 'WRITTEN_ELABORATION',
  WrittenExamination = 'WRITTEN_EXAMINATION',
}

/** Describes the type/category of the uploaded file. */
export enum FileType {
  Document = 'DOCUMENT',
  Picture = 'PICTURE',
}

export type FormComponent = {
  __typename?: 'FormComponent';
  id: Scalars['ID']['output'];
  index?: Maybe<Scalars['Int']['output']>;
  mandatory: Scalars['Boolean']['output'];
  moduleHandin?: Maybe<ModuleHandin>;
  title?: Maybe<Scalars['String']['output']>;
  type: HandinComponent;
};

export type FormComponentInput = {
  index?: InputMaybe<Scalars['Int']['input']>;
  mandatory: Scalars['Boolean']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type: HandinComponent;
};

/** Represents the student handbook overview */
export type HandbookOverviewData = {
  __typename?: 'HandbookOverviewData';
  /** Overview data for all compulsory elective modules */
  COMPULSORY_ELECTIVE: HandbookOverviewModuleTypeData;
  /** Overview data for all passed elective modules */
  ELECTIVE: HandbookOverviewModuleTypeData;
  /** Overview data for all mandatory modules */
  MANDATORY: HandbookOverviewModuleTypeData;
  /** The compulsory elective groups */
  compulsoryElectiveGroups: Array<CompulsoryElectiveGroupData>;
  /** Overview data for modules that do not count towards graduation */
  invalidAssessments: Array<HandbookOverviewModuleData>;
};

/** Represents the status and best grade for a given module */
export type HandbookOverviewModuleData = {
  __typename?: 'HandbookOverviewModuleData';
  /** The ECTS of the module */
  ects: Scalars['Float']['output'];
  /** The best grade */
  grade: Scalars['String']['output'];
  /** The module identifier */
  moduleIdentifier: Scalars['String']['output'];
  /** The student status of the module */
  status: Scalars['String']['output'];
  /** The module title */
  title: Scalars['String']['output'];
};

/** Represents data for the handbook modules for a type */
export type HandbookOverviewModuleTypeData = {
  __typename?: 'HandbookOverviewModuleTypeData';
  /** The ECTS stats for capstone projects */
  modules: Array<HandbookOverviewModuleData>;
  /** The total ECTS needed */
  totalECTSNeeded: Scalars['Float']['output'];
};

export enum HandinComponent {
  Checkbox = 'CHECKBOX',
  Comment = 'COMMENT',
  Document = 'DOCUMENT',
  Essay = 'ESSAY',
  Link = 'LINK',
  SelfAssessment = 'SELF_ASSESSMENT',
  SelfAssessmentRationale = 'SELF_ASSESSMENT_RATIONALE',
}

export type HandinCustomDeadlineInput = {
  deadline?: InputMaybe<Scalars['DateTime']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  moduleId?: InputMaybe<Scalars['String']['input']>;
};

/** Status of the user hand-in */
export enum HandinStatus {
  NotSubmitted = 'NOT_SUBMITTED',
  Submitted = 'SUBMITTED',
}

/** Information about the important dates in the semester */
export type ImportantSemesterDate = {
  __typename?: 'ImportantSemesterDate';
  /** The actual date value. */
  date?: Maybe<Scalars['DateTime']['output']>;
  /** A unique ID for this semester date */
  id?: Maybe<Scalars['ID']['output']>;
  /** A subtitle that is used to indicate what type of date this is e.g. a deadline. */
  subtitle?: Maybe<Scalars['String']['output']>;
  /** The name of this important semester date. */
  title?: Maybe<Scalars['String']['output']>;
  visibility?: Maybe<SemesterDateVisibility>;
};

export type ImportantSemesterDateCreateInput = {
  date: Scalars['DateTime']['input'];
  semesterId: Scalars['ID']['input'];
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  visibility: SemesterDateVisibility;
};

export type ImportantSemesterDateFilter = {
  /**
   * If this flag is set, the list only contains custom semester dates. Some dates are set in the
   * application and others can be added dynamically. These dynamically added dates are what we
   * refer to as "custom" dates.
   */
  custom?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Information about the important dates in the semester */
export type ImportantSemesterDateView = {
  __typename?: 'ImportantSemesterDateView';
  /** The actual date value. */
  date?: Maybe<Scalars['DateTime']['output']>;
  /** A unique ID for this semester date */
  id?: Maybe<Scalars['ID']['output']>;
  /** A subtitle that is used to indicate what type of date this is e.g. a deadline. */
  subtitle?: Maybe<Scalars['String']['output']>;
  /** The name of this important semester date. */
  title?: Maybe<Scalars['String']['output']>;
};

export type JourneyDocument = {
  __typename?: 'JourneyDocument';
  createdAt: Scalars['DateTime']['output'];
  fileName: Scalars['String']['output'];
  fileType: FileType;
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  signedLink?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type LearningResource = {
  __typename?: 'LearningResource';
  approvedBy?: Maybe<User>;
  /** Whether or not the currently signed in user can disable this learning resource */
  canDisable?: Maybe<Scalars['Boolean']['output']>;
  /** Whether or not the currently signed in user can edit this learning resource */
  canEdit?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  link?: Maybe<Scalars['String']['output']>;
  medium: ResourceMedium;
  modules: Array<Module>;
  submittedBy?: Maybe<User>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LearningResourceFilter = {
  search?: InputMaybe<Scalars['String']['input']>;
};

export type LearningResourceInput = {
  description: Scalars['String']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
  medium: ResourceMedium;
  modules: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type Module = {
  __typename?: 'Module';
  contactTime?: Maybe<Scalars['Int']['output']>;
  content: Scalars['String']['output'];
  coordinator?: Maybe<User>;
  createdAt: Scalars['DateTime']['output'];
  department?: Maybe<Department>;
  ects: Scalars['Float']['output'];
  examinationForms?: Maybe<Array<ExaminationForm>>;
  frequency: ModuleFrequency;
  graded?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  learningResources: Array<LearningResource>;
  moduleHandbooks?: Maybe<Array<ModuleHandbookModule>>;
  moduleIdentifier?: Maybe<Scalars['String']['output']>;
  prerequisiteFor?: Maybe<Array<Module>>;
  prerequisites?: Maybe<Array<Module>>;
  qualificationGoals?: Maybe<Scalars['String']['output']>;
  replacementFor?: Maybe<Array<Module>>;
  replacements?: Maybe<Array<Module>>;
  retired?: Maybe<Scalars['Boolean']['output']>;
  selfStudyTime?: Maybe<Scalars['Int']['output']>;
  semesterModules: Array<SemesterModule>;
  shortCode: Scalars['String']['output'];
  simpleShortCode: Scalars['String']['output'];
  teachingFormats?: Maybe<Array<TeachingFormat>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  weeklyHours?: Maybe<Scalars['Int']['output']>;
  workload?: Maybe<Scalars['Int']['output']>;
};

/** Statistic that holds the number of assessments per module, with counts for each type */
export type ModuleAndAssessmentProposalStatistic = {
  __typename?: 'ModuleAndAssessmentProposalStatistic';
  /** Number of alternative assessment proposals */
  alternativeAssessmentProposals?: Maybe<Scalars['Int']['output']>;
  /** Number of early assessment proposals */
  earlyAssessmentProposals?: Maybe<Scalars['Int']['output']>;
  semesterModule?: Maybe<SemesterModule>;
};

/** Statistic that holds the number of assessments per module, with counts for each type */
export type ModuleAndAssessmentStatistic = {
  __typename?: 'ModuleAndAssessmentStatistic';
  /** Number of alternative assessment registrations */
  alternativeRegistrations?: Maybe<Scalars['Int']['output']>;
  /** Number of foundation assessment registrations */
  foundationRegistrations?: Maybe<Scalars['Int']['output']>;
  /** Number of reassessment registrations for the previous semester */
  reassessmentRegistrations?: Maybe<Scalars['Int']['output']>;
  semesterModule?: Maybe<SemesterModule>;
  /** Number of standard assessment registrations */
  standardRegistrations?: Maybe<Scalars['Int']['output']>;
  /** Number of sts assessment registrations */
  stsRegistrations?: Maybe<Scalars['Int']['output']>;
};

export type ModuleFilter = {
  /** Show only modules coordinated by the given user */
  coordinator?: InputMaybe<Scalars['ID']['input']>;
  /** Show only modules belonging to the respective department */
  department?: InputMaybe<Scalars['String']['input']>;
  /** Show only modules failed by the current user */
  failed?: InputMaybe<Scalars['Boolean']['input']>;
  /** Show only modules which are mandatory/compulsory elective for the current user */
  onlyMandatory?: InputMaybe<Scalars['Boolean']['input']>;
  /** Show only modules passed by the current user */
  passed?: InputMaybe<Scalars['Boolean']['input']>;
  /** Fulltext search string */
  search?: InputMaybe<Scalars['String']['input']>;
};

export enum ModuleFrequency {
  EverySemester = 'EVERY_SEMESTER',
  Yearly = 'YEARLY',
}

export type ModuleHandbook = {
  __typename?: 'ModuleHandbook';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  modules: Array<ModuleHandbookModule>;
  name: Scalars['String']['output'];
  students?: Maybe<Array<StudentModuleHandbook>>;
  studyProgram?: Maybe<StudyProgram>;
  updatedAt: Scalars['DateTime']['output'];
  validFrom: Scalars['DateTime']['output'];
};

export type ModuleHandbookFilter = {
  department?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ModuleHandbookInput = {
  name: Scalars['String']['input'];
  validFrom: Scalars['DateTime']['input'];
};

export type ModuleHandbookModule = {
  __typename?: 'ModuleHandbookModule';
  createdAt: Scalars['DateTime']['output'];
  electiveModules: Array<ModuleHandbookModule>;
  id: Scalars['ID']['output'];
  module?: Maybe<Module>;
  moduleHandbook?: Maybe<ModuleHandbook>;
  numMandatoryElectives?: Maybe<Scalars['Int']['output']>;
  otherElectiveModules: Array<ModuleHandbookModule>;
  type: ModuleHandbookModuleType;
  updatedAt: Scalars['DateTime']['output'];
};

export type ModuleHandbookModuleInput = {
  electiveModules: Array<Scalars['String']['input']>;
  numMandatoryElectives?: InputMaybe<Scalars['Int']['input']>;
  type: ModuleHandbookModuleType;
};

export enum ModuleHandbookModuleType {
  CompulsoryElective = 'COMPULSORY_ELECTIVE',
  Elective = 'ELECTIVE',
  Mandatory = 'MANDATORY',
}

export type ModuleHandin = {
  __typename?: 'ModuleHandin';
  canDelete?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deadline?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  eventGroup?: Maybe<EventGroup>;
  /** Form components for the this hand-in */
  formComponents: Array<FormComponent>;
  id: Scalars['ID']['output'];
  /** Deadline for this hand-in */
  latestHandinDeadline?: Maybe<Scalars['DateTime']['output']>;
  mandatory: Scalars['Boolean']['output'];
  permissions: ModuleHandinPermissions;
  published: Scalars['Boolean']['output'];
  semesterModules?: Maybe<Array<Maybe<SemesterModule>>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userHandins: Array<UserHandin>;
};

export type ModuleHandinFilter = {
  /** Show assessment Handins */
  mandatory?: InputMaybe<Scalars['Boolean']['input']>;
  /** Show all Handins related to specific module */
  module?: InputMaybe<Scalars['ID']['input']>;
  /** Fulltext search string */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Show all Handins in a specific semester */
  semester?: InputMaybe<Scalars['ID']['input']>;
};

export type ModuleHandinInput = {
  deadline?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  eventGroupId?: InputMaybe<Scalars['String']['input']>;
  formComponents: Array<FormComponentInput>;
  mandatory: Scalars['Boolean']['input'];
  semesterModuleIds?: InputMaybe<Array<Scalars['String']['input']>>;
  setDeadline?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
};

export type ModuleHandinPermissions = {
  __typename?: 'ModuleHandinPermissions';
  canManage?: Maybe<Scalars['Boolean']['output']>;
};

export type ModuleInput = {
  contactTime: Scalars['Int']['input'];
  content: Scalars['String']['input'];
  coordinator: Scalars['String']['input'];
  department?: InputMaybe<Scalars['String']['input']>;
  ects: Scalars['Float']['input'];
  examinationForms: Array<ExaminationForm>;
  frequency: ModuleFrequency;
  graded: Scalars['Boolean']['input'];
  prerequisites: Array<Scalars['String']['input']>;
  qualificationGoals: Scalars['String']['input'];
  selfStudyTime: Scalars['Int']['input'];
  shortCode: Scalars['String']['input'];
  teachingFormats: Array<TeachingFormat>;
  title: Scalars['String']['input'];
  weeklyHours: Scalars['Int']['input'];
};

export type ModuleUpdate = {
  __typename?: 'ModuleUpdate';
  author?: Maybe<User>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  semesterModule?: Maybe<SemesterModule>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Accepts an alternative assessment proposal */
  acceptAssessmentProposal?: Maybe<Assessment>;
  acceptProjectInvite?: Maybe<Scalars['Boolean']['output']>;
  acceptSemesterModuleChanges?: Maybe<SemesterModule>;
  addComment?: Maybe<UpdateComment>;
  /** Add an event to an event group */
  addEventToGroup?: Maybe<Event>;
  addModuleToModuleHandbook?: Maybe<Scalars['Boolean']['output']>;
  addModuleToSemester?: Maybe<Scalars['Boolean']['output']>;
  addModuleToSemesterPlanner: SemesterPlannerModule;
  /** Add a participant to an event group */
  addParticipantToEventGroup: Scalars['Boolean']['output'];
  /** Add a Slack channel to an event group */
  addSlackChannel: EventGroup;
  archiveProject: Scalars['Boolean']['output'];
  /** Archive Slack channel for an event group */
  archiveSlackChannel: EventGroup;
  assignEventGroupToSemesterModule?: Maybe<SemesterModule>;
  /** Mark all the assessments as ready for publishing */
  batchMarkReadyForPublishing?: Maybe<Array<Maybe<Assessment>>>;
  /** Publish the result of multiple assessments */
  batchPublishAssessments?: Maybe<Array<Maybe<Assessment>>>;
  /** Refer all the selected assessments to the EO */
  batchReferToEo?: Maybe<Array<Maybe<Assessment>>>;
  /** Mark multiple absent `assessment` as either excused or not excused and publish the result */
  batchResolveAbsence?: Maybe<Array<Maybe<Assessment>>>;
  /** Add a host to multiple events in an event group */
  batchUpdateEventHosts?: Maybe<Array<Maybe<Event>>>;
  carryOverProject: Project;
  /** Check if the given Slack name is available */
  checkSlackChannelNameAvailable: Scalars['Boolean']['output'];
  checkoutProject: Scalars['Boolean']['output'];
  clearSemesterPlanner: SemesterPlanner;
  /** Registers the current user to an alternative assessment by submitting a proposal */
  createAlternativeAssessment?: Maybe<Assessment>;
  /** Creates an assessment without going through the regular registration process */
  createAssessment?: Maybe<Assessment>;
  /** Create an event group */
  createEventGroup: EventGroup;
  /** Registers the current user to a foundation assessment */
  createFoundationAssessment?: Maybe<Assessment>;
  createImportantSemesterDate?: Maybe<ImportantSemesterDate>;
  /** Create a new learning resource */
  createLearningResource?: Maybe<LearningResource>;
  createModule?: Maybe<Module>;
  createModuleHandbook?: Maybe<ModuleHandbook>;
  /** Create a new hand-in */
  createModuleHandin: ModuleHandin;
  createModuleUpdate?: Maybe<ModuleUpdate>;
  createProject: Project;
  createProjectUpdate: ProjectUpdate;
  createSemester?: Maybe<Semester>;
  /** Registers the current user to a standard assessment */
  createStandardAssessment?: Maybe<Assessment>;
  /** Registers the current user to a STS assessment */
  createStsAssessment?: Maybe<Assessment>;
  createTag?: Maybe<Tag>;
  createUser?: Maybe<User>;
  /** Declines an alternative assessment proposal */
  declineAssessmentProposal?: Maybe<Assessment>;
  /** Declines an early assessment request */
  declineEarlyAssessment?: Maybe<Assessment>;
  declineProjectInvite?: Maybe<Scalars['Boolean']['output']>;
  declineSemesterModuleChanges?: Maybe<Semester>;
  /** Delete an event group */
  deleteEventGroup: Scalars['Boolean']['output'];
  deleteImportantSemesterDate?: Maybe<Scalars['Boolean']['output']>;
  deleteJourneyDocument?: Maybe<Scalars['Boolean']['output']>;
  /** Delete a learning resource */
  deleteLearningResource?: Maybe<Scalars['Boolean']['output']>;
  deleteModuleHandbookModule?: Maybe<Scalars['Boolean']['output']>;
  deleteModuleHandin?: Maybe<Scalars['Boolean']['output']>;
  deleteObject: Scalars['Boolean']['output'];
  /** Delete irrelevant user hand-ins */
  deleteSubmissions?: Maybe<Scalars['Boolean']['output']>;
  duplicateModuleHandin?: Maybe<ModuleHandin>;
  editImportantSemesterDate?: Maybe<ImportantSemesterDate>;
  followProject: Project;
  /** Sends a password reset email to the user with the email specified */
  forgotPassword?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Sign in the user using the Google OAuth mechanism. See
   * [here](https://developers.google.com/identity/sign-in/web/reference). Takes
   * the code returned after the Google sign in process on the frontend and
   * validates the user based on that. Returns a token
   */
  googleSignin?: Maybe<AuthPayload>;
  inviteUsersToProject?: Maybe<Scalars['Boolean']['output']>;
  /** Leave an event */
  leaveEvent?: Maybe<Event>;
  linkModuleHandbookToUser?: Maybe<StudentModuleHandbook>;
  makeProjectOfficial: Scalars['Boolean']['output'];
  markNotificationRead: Notification;
  proposeSemesterModuleChanges?: Maybe<SemesterModule>;
  /** Register for an event group */
  registerForEventGroup: Scalars['Boolean']['output'];
  /** Rejoin an event */
  rejoinEvent?: Maybe<Event>;
  /** Removes the current assistant from the specified assessment */
  removeAssessmentHelper?: Maybe<Assessment>;
  /** Remove an event from an event group */
  removeEventFromGroup?: Maybe<Event>;
  removeModuleFromSemesterPlanner?: Maybe<SemesterPlannerModule>;
  /** Remove a participant from an event group */
  removeParticipantFromEventGroup: Scalars['Boolean']['output'];
  requestCheckout: Scalars['Boolean']['output'];
  requestSignoff: Scalars['Boolean']['output'];
  /** Mark an absent `assessment` as either excused or not excused and publish the result */
  resolveAbsence?: Maybe<Assessment>;
  revokeAssessmentForSemesterModule?: Maybe<Scalars['Boolean']['output']>;
  /** Schedules an early assesstment, effectively accepting the request */
  scheduleEarlyAssessment?: Maybe<Assessment>;
  /** Sets the assessor on the specified assessment */
  setAssessmentAssessor?: Maybe<Assessment>;
  /** Sets the assistant on the specified assessment */
  setAssessmentHelper?: Maybe<Assessment>;
  /** Sets a new password for the user identified by the `set` token in the payload */
  setPassword?: Maybe<AuthPayload>;
  setProjectSponsor: Scalars['Boolean']['output'];
  /** Sign in the user using email and password and return a JWT token. */
  signin?: Maybe<AuthPayload>;
  /** Submit a hand-in */
  submitHandin?: Maybe<UserHandin>;
  syncGitLabGroups: Scalars['Boolean']['output'];
  /** Sync Slack user IDs */
  syncSlackUsers: Scalars['Boolean']['output'];
  toggleAssessmentEmails?: Maybe<Scalars['Boolean']['output']>;
  unarchiveProject: Scalars['Boolean']['output'];
  unassignEventGroupFromSemesterModule?: Maybe<SemesterModule>;
  /** Leave an event group */
  unregisterFromEventGroup: Scalars['Boolean']['output'];
  /** Updates an assessments details */
  updateAssessment?: Maybe<Assessment>;
  updateConsultationCapacity?: Maybe<Scalars['Boolean']['output']>;
  /** Update event group details */
  updateEventGroup: EventGroup;
  /** Add a host to an event in an event group */
  updateEventHost?: Maybe<Event>;
  /** Update hand-in feedback */
  updateHandin?: Maybe<UserHandin>;
  /** Update a learning resource */
  updateLearningResource?: Maybe<LearningResource>;
  updateModule?: Maybe<Module>;
  updateModuleHandbook?: Maybe<ModuleHandbook>;
  updateModuleHandbookModule?: Maybe<ModuleHandbookModule>;
  /** Update hand-in details */
  updateModuleHandin: ModuleHandin;
  updateProject: Project;
  updateSemester?: Maybe<Semester>;
  updateSemesterModule?: Maybe<SemesterModule>;
  updateSemesterPlannerModule: SemesterPlannerModule;
  updateUser?: Maybe<User>;
  /** Updates a users profile */
  updateUserProfile?: Maybe<User>;
};

export type MutationAcceptAssessmentProposalArgs = {
  assessmentId: Scalars['ID']['input'];
  data: AssessmentProposalInput;
};

export type MutationAcceptProjectInviteArgs = {
  projectId: Scalars['ID']['input'];
};

export type MutationAcceptSemesterModuleChangesArgs = {
  semesterModuleId: Scalars['ID']['input'];
};

export type MutationAddCommentArgs = {
  content: Scalars['String']['input'];
  updateId: Scalars['ID']['input'];
};

export type MutationAddEventToGroupArgs = {
  eventGroupId: Scalars['ID']['input'];
  eventId: Scalars['ID']['input'];
};

export type MutationAddModuleToModuleHandbookArgs = {
  moduleHandbookId: Scalars['ID']['input'];
  moduleId: Scalars['ID']['input'];
  type: ModuleHandbookModuleType;
};

export type MutationAddModuleToSemesterArgs = {
  moduleId: Scalars['ID']['input'];
  semesterId: Scalars['ID']['input'];
};

export type MutationAddModuleToSemesterPlannerArgs = {
  data: SemesterPlannerModuleInput;
};

export type MutationAddParticipantToEventGroupArgs = {
  eventGroupId: Scalars['ID']['input'];
  participantId: Scalars['ID']['input'];
};

export type MutationAddSlackChannelArgs = {
  channelId?: InputMaybe<Scalars['String']['input']>;
  channelName?: InputMaybe<Scalars['String']['input']>;
  eventGroupId: Scalars['ID']['input'];
};

export type MutationArchiveProjectArgs = {
  id: Scalars['ID']['input'];
};

export type MutationArchiveSlackChannelArgs = {
  eventGroupId: Scalars['ID']['input'];
};

export type MutationAssignEventGroupToSemesterModuleArgs = {
  eventGroupId: Scalars['ID']['input'];
  semesterModuleId: Scalars['ID']['input'];
};

export type MutationBatchMarkReadyForPublishingArgs = {
  assessments: Array<Scalars['ID']['input']>;
};

export type MutationBatchPublishAssessmentsArgs = {
  assessments: Array<Scalars['ID']['input']>;
};

export type MutationBatchReferToEoArgs = {
  assessments: Array<Scalars['ID']['input']>;
};

export type MutationBatchResolveAbsenceArgs = {
  assessmentStatus: AssessmentStatus;
  assessments: Array<Scalars['ID']['input']>;
};

export type MutationBatchUpdateEventHostsArgs = {
  events: Array<Scalars['ID']['input']>;
  hostId: Scalars['ID']['input'];
};

export type MutationCarryOverProjectArgs = {
  data: CarryOverProjectInput;
};

export type MutationCheckSlackChannelNameAvailableArgs = {
  channelName: Scalars['String']['input'];
};

export type MutationCheckoutProjectArgs = {
  accepted: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
};

export type MutationCreateAlternativeAssessmentArgs = {
  data: AssessmentCreateInput;
  semesterModuleId: Scalars['ID']['input'];
};

export type MutationCreateAssessmentArgs = {
  data: AssessmentInput;
};

export type MutationCreateEventGroupArgs = {
  data: EventGroupInput;
};

export type MutationCreateFoundationAssessmentArgs = {
  data: AssessmentCreateInput;
  semesterModuleId: Scalars['ID']['input'];
};

export type MutationCreateImportantSemesterDateArgs = {
  data: ImportantSemesterDateCreateInput;
};

export type MutationCreateLearningResourceArgs = {
  data: LearningResourceInput;
};

export type MutationCreateModuleArgs = {
  data: ModuleInput;
};

export type MutationCreateModuleHandbookArgs = {
  data: ModuleHandbookInput;
  studyProgramId: Scalars['ID']['input'];
};

export type MutationCreateModuleHandinArgs = {
  data: ModuleHandinInput;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationCreateModuleUpdateArgs = {
  data: SemesterModuleUpdateInput;
  semesterModuleId: Scalars['ID']['input'];
};

export type MutationCreateProjectArgs = {
  data: CreateProjectInput;
};

export type MutationCreateProjectUpdateArgs = {
  data: ProjectUpdateInput;
  project: Scalars['ID']['input'];
};

export type MutationCreateSemesterArgs = {
  data: SemesterCreationInput;
};

export type MutationCreateStandardAssessmentArgs = {
  data: AssessmentCreateInput;
  semesterModuleId: Scalars['ID']['input'];
};

export type MutationCreateStsAssessmentArgs = {
  data: AssessmentCreateInput;
  semesterModuleId: Scalars['ID']['input'];
};

export type MutationCreateTagArgs = {
  category?: InputMaybe<TagCategory>;
  name: Scalars['String']['input'];
};

export type MutationCreateUserArgs = {
  data: UserInput;
};

export type MutationDeclineAssessmentProposalArgs = {
  assessmentId: Scalars['ID']['input'];
};

export type MutationDeclineEarlyAssessmentArgs = {
  assessmentId: Scalars['ID']['input'];
};

export type MutationDeclineProjectInviteArgs = {
  projectId: Scalars['ID']['input'];
};

export type MutationDeclineSemesterModuleChangesArgs = {
  semesterModuleId: Scalars['ID']['input'];
};

export type MutationDeleteEventGroupArgs = {
  eventGroupId: Scalars['ID']['input'];
};

export type MutationDeleteImportantSemesterDateArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteJourneyDocumentArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteLearningResourceArgs = {
  learningResourceId: Scalars['ID']['input'];
};

export type MutationDeleteModuleHandbookModuleArgs = {
  moduleHandbookModuleId: Scalars['ID']['input'];
};

export type MutationDeleteModuleHandinArgs = {
  moduleHandinId: Scalars['ID']['input'];
  unpublish?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationDeleteObjectArgs = {
  awsKey: Scalars['String']['input'];
};

export type MutationDeleteSubmissionsArgs = {
  userHandinIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type MutationDuplicateModuleHandinArgs = {
  moduleHandinId: Scalars['ID']['input'];
};

export type MutationEditImportantSemesterDateArgs = {
  data: ImportantSemesterDateCreateInput;
  id: Scalars['ID']['input'];
};

export type MutationFollowProjectArgs = {
  action: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};

export type MutationGoogleSigninArgs = {
  code: Scalars['String']['input'];
};

export type MutationInviteUsersToProjectArgs = {
  projectId: Scalars['ID']['input'];
  users: Array<ProjectInviteUserInput>;
};

export type MutationLeaveEventArgs = {
  eventId: Scalars['ID']['input'];
};

export type MutationLinkModuleHandbookToUserArgs = {
  moduleHandbookId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type MutationMakeProjectOfficialArgs = {
  id: Scalars['ID']['input'];
};

export type MutationMarkNotificationReadArgs = {
  id: Scalars['ID']['input'];
};

export type MutationProposeSemesterModuleChangesArgs = {
  data: SemesterModuleInput;
  moduleShortCode?: InputMaybe<Scalars['String']['input']>;
  semesterId?: InputMaybe<Scalars['ID']['input']>;
  semesterModuleId: Scalars['ID']['input'];
};

export type MutationRegisterForEventGroupArgs = {
  eventGroupId: Scalars['ID']['input'];
};

export type MutationRejoinEventArgs = {
  eventId: Scalars['ID']['input'];
};

export type MutationRemoveAssessmentHelperArgs = {
  assessmentId: Scalars['ID']['input'];
};

export type MutationRemoveEventFromGroupArgs = {
  eventId: Scalars['ID']['input'];
};

export type MutationRemoveModuleFromSemesterPlannerArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemoveParticipantFromEventGroupArgs = {
  eventGroupId: Scalars['ID']['input'];
  participantId: Scalars['ID']['input'];
};

export type MutationRequestCheckoutArgs = {
  id: Scalars['ID']['input'];
  portfolioDescription: Scalars['String']['input'];
  teamMembers?: InputMaybe<Array<ProjectCheckoutRequestTeamMemberInput>>;
};

export type MutationRequestSignoffArgs = {
  id: Scalars['ID']['input'];
};

export type MutationResolveAbsenceArgs = {
  assessmentId: Scalars['ID']['input'];
  assessmentStatus: AssessmentStatus;
};

export type MutationRevokeAssessmentForSemesterModuleArgs = {
  semesterModuleId: Scalars['ID']['input'];
};

export type MutationScheduleEarlyAssessmentArgs = {
  assessmentId: Scalars['ID']['input'];
  data: AssessmentProposalInput;
};

export type MutationSetAssessmentAssessorArgs = {
  assessmentId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type MutationSetAssessmentHelperArgs = {
  assessmentId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type MutationSetPasswordArgs = {
  password: Scalars['String']['input'];
  set: Scalars['String']['input'];
};

export type MutationSetProjectSponsorArgs = {
  id: Scalars['ID']['input'];
  projectSponsorId?: InputMaybe<Scalars['ID']['input']>;
};

export type MutationSigninArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationSubmitHandinArgs = {
  data: Array<UserFormComponentsInput>;
  handinId: Scalars['ID']['input'];
};

export type MutationToggleAssessmentEmailsArgs = {
  enableEmail: Scalars['Boolean']['input'];
};

export type MutationUnarchiveProjectArgs = {
  id: Scalars['ID']['input'];
};

export type MutationUnassignEventGroupFromSemesterModuleArgs = {
  eventGroupId: Scalars['ID']['input'];
  semesterModuleId: Scalars['ID']['input'];
};

export type MutationUnregisterFromEventGroupArgs = {
  eventGroupId: Scalars['ID']['input'];
};

export type MutationUpdateAssessmentArgs = {
  assessmentId: Scalars['ID']['input'];
  data: AssessmentInput;
};

export type MutationUpdateConsultationCapacityArgs = {
  consultationCapacity: Scalars['Int']['input'];
};

export type MutationUpdateEventGroupArgs = {
  data: EventGroupInput;
  eventGroupId: Scalars['ID']['input'];
};

export type MutationUpdateEventHostArgs = {
  eventId: Scalars['ID']['input'];
  hostId: Scalars['ID']['input'];
};

export type MutationUpdateHandinArgs = {
  data: UpdateHandinInput;
  handinId: Scalars['ID']['input'];
};

export type MutationUpdateLearningResourceArgs = {
  data: LearningResourceInput;
  learningResourceId: Scalars['ID']['input'];
};

export type MutationUpdateModuleArgs = {
  data: ModuleInput;
  moduleId: Scalars['ID']['input'];
};

export type MutationUpdateModuleHandbookArgs = {
  data: ModuleHandbookInput;
  moduleHandbookId: Scalars['ID']['input'];
  studyProgramId: Scalars['ID']['input'];
};

export type MutationUpdateModuleHandbookModuleArgs = {
  data: ModuleHandbookModuleInput;
  moduleHandbookModuleId: Scalars['ID']['input'];
};

export type MutationUpdateModuleHandinArgs = {
  data: ModuleHandinInput;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  moduleHandinId: Scalars['ID']['input'];
};

export type MutationUpdateProjectArgs = {
  data: UpdateProjectInput;
  id: Scalars['ID']['input'];
};

export type MutationUpdateSemesterArgs = {
  data: SemesterUpdateInput;
  semesterId: Scalars['ID']['input'];
};

export type MutationUpdateSemesterModuleArgs = {
  data: SemesterModuleInput;
  semesterModuleId: Scalars['ID']['input'];
};

export type MutationUpdateSemesterPlannerModuleArgs = {
  data: UpdateSemesterPlannerModuleInput;
};

export type MutationUpdateUserArgs = {
  data: UserInput;
  id: Scalars['ID']['input'];
};

export type MutationUpdateUserProfileArgs = {
  data: UpdateUserProfileInput;
  userId: Scalars['ID']['input'];
};

/** Represents the ECTS score that the user has collected for a given type of modules */
export type MyEctsStats = {
  __typename?: 'MyECTSStats';
  /** The total count of collected ECTS */
  collectedECTS: Scalars['Float']['output'];
  /** The total amount of ECTS needed for graduation */
  totalECTSNeeded: Scalars['Float']['output'];
};

/** Represents a module the user has already been assessed in, paired with all the associated assessments */
export type MyStudiesModule = {
  __typename?: 'MyStudiesModule';
  assessments?: Maybe<Array<Assessment>>;
  coordinator?: Maybe<User>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  moduleIdentifier?: Maybe<Scalars['String']['output']>;
  moduleType?: Maybe<ModuleHandbookModuleType>;
  shortCode: Scalars['String']['output'];
  simpleShortCode?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** Represents the ECTS scores by module type that the user has collected */
export type MyStudyData = {
  __typename?: 'MyStudyData';
  /** The ECTS stats for capstone projects */
  capstone: MyEctsStats;
  /** The ECTS stats for compulsory elective modules */
  compulsoryElective: MyEctsStats;
  /** The ECTS stats for optional modules */
  elective: MyEctsStats;
  /** The ECTS stats for mandatory modules */
  mandatory: MyEctsStats;
  /** The ECTS stats for orientation modules */
  orientation: MyEctsStats;
  /** The ECTS stats for sts modules */
  sts: MyEctsStats;
  /** The ECTS stats for theses */
  thesis: MyEctsStats;
};

/** Represents a total count of all modules that have been passed and ects that were collected */
export type MyTotalModuleStats = {
  __typename?: 'MyTotalModuleStats';
  /** The total score of collected ects */
  score: Scalars['Float']['output'];
  /** The total count of passed modules */
  totalModuleCount: Scalars['Int']['output'];
};

export type NavLink = {
  __typename?: 'NavLink';
  disabled?: Maybe<Scalars['Boolean']['output']>;
  icon: Scalars['String']['output'];
  label: Scalars['String']['output'];
  link: Scalars['String']['output'];
  whitelistedRoles: Array<Scalars['String']['output']>;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  /** This notifcations body text/longer form message */
  label: Scalars['String']['output'];
  /** A link to the resource affected by the notification */
  link?: Maybe<Scalars['String']['output']>;
  /** Notates whether this notification has benn read yet. */
  read?: Maybe<Scalars['Boolean']['output']>;
  /** This notifactions title/header text */
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  /** The urgency category of this notification */
  urgency: NotificationUrgency;
};

/** Possible urgency categories for notifications */
export enum NotificationUrgency {
  Important = 'IMPORTANT',
  Info = 'INFO',
  Urgent = 'URGENT',
}

/** Input Object used for offset based pagination of list results */
export type OffsetPaginationInput = {
  /** The desired number of elements returned per page */
  limit?: Scalars['Int']['input'];
  /** How many elements to skip before returning the first result */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type PartnerCompany = {
  __typename?: 'PartnerCompany';
  color: Scalars['String']['output'];
  domain: Scalars['String']['output'];
  id: Scalars['String']['output'];
  logoUrl: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type Permission = {
  __typename?: 'Permission';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Maybe<UserRole>>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Project = {
  __typename?: 'Project';
  activeCheckoutRequest?: Maybe<Array<ProjectChange>>;
  activeMemberships?: Maybe<Array<ProjectMembership>>;
  checkoutRequestDate?: Maybe<Scalars['DateTime']['output']>;
  coverUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currentUserMembership?: Maybe<ProjectMembership>;
  description: Scalars['String']['output'];
  followers?: Maybe<Array<User>>;
  id: Scalars['ID']['output'];
  invites: Array<ProjectInvite>;
  isApproved: Scalars['Boolean']['output'];
  isArchived: Scalars['Boolean']['output'];
  isCheckedOut: Scalars['Boolean']['output'];
  isConsultantInvitationActive?: Maybe<Scalars['Boolean']['output']>;
  isCurrentSemesterProject?: Maybe<Scalars['Boolean']['output']>;
  isFutureProject?: Maybe<Scalars['Boolean']['output']>;
  isLookingForTeammates?: Maybe<Scalars['Boolean']['output']>;
  isProjectOwner?: Maybe<Scalars['Boolean']['output']>;
  isRegisteredThisSemester?: Maybe<Scalars['Boolean']['output']>;
  isSignoffRequestActive?: Maybe<Scalars['Boolean']['output']>;
  memberships: Array<ProjectMembership>;
  originator?: Maybe<User>;
  outline?: Maybe<Scalars['String']['output']>;
  permissions: ProjectPermissions;
  portfolioDescription?: Maybe<Scalars['String']['output']>;
  projectChanges: Array<ProjectChange>;
  projectSiblings?: Maybe<Array<Maybe<Project>>>;
  projectType?: Maybe<ProjectType>;
  semesters?: Maybe<Array<Semester>>;
  signoffRequestDate?: Maybe<Scalars['DateTime']['output']>;
  sponsor?: Maybe<User>;
  tags: Array<Tag>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  updates: Array<ProjectUpdate>;
};

export type ProjectApprovalsFilter = {
  /** Show only projects that have a sponsor */
  hasSponsor?: InputMaybe<Scalars['Boolean']['input']>;
  /** Show only official CODE projects */
  officialProject?: InputMaybe<Scalars['Boolean']['input']>;
  /** Fulltext search string */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Show projects that are part of x semester */
  semester?: InputMaybe<Scalars['String']['input']>;
  /** Sponsor assigned to the project */
  sponsor?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectChange = {
  __typename?: 'ProjectChange';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isApproved?: Maybe<Scalars['Boolean']['output']>;
  isCheckedOut?: Maybe<Scalars['Boolean']['output']>;
  memberships?: Maybe<Array<Maybe<ProjectMembership>>>;
  outline?: Maybe<Scalars['String']['output']>;
  portfolioDescription?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
  projectCheckoutRequests?: Maybe<Array<ProjectCheckoutRequest>>;
  semester?: Maybe<Semester>;
  sponsor?: Maybe<User>;
  title?: Maybe<Scalars['String']['output']>;
  type: ProjectChangeType;
  update?: Maybe<ProjectUpdate>;
};

export enum ProjectChangeType {
  Approved = 'APPROVED',
  CarryOver = 'CARRY_OVER',
  CheckedOut = 'CHECKED_OUT',
  CheckoutDeclined = 'CHECKOUT_DECLINED',
  CheckoutRequested = 'CHECKOUT_REQUESTED',
  Description = 'DESCRIPTION',
  Members = 'MEMBERS',
  Outline = 'OUTLINE',
  ProjectUpdate = 'PROJECT_UPDATE',
  Sponsor = 'SPONSOR',
  Title = 'TITLE',
}

export type ProjectCheckoutRequest = {
  __typename?: 'ProjectCheckoutRequest';
  accepted?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  responsibilities?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  student?: Maybe<User>;
};

export type ProjectCheckoutRequestTeamMemberInput = {
  keyLearnings?: InputMaybe<Scalars['String']['input']>;
  responsibilities: Scalars['String']['input'];
  role: Scalars['String']['input'];
  tools?: InputMaybe<Array<Scalars['String']['input']>>;
  userId: Scalars['String']['input'];
};

export type ProjectFilter = {
  /** Show projects that are still looking for teammates */
  isLookingForTeammates?: InputMaybe<Scalars['Boolean']['input']>;
  /** Show only projects that were created by the current user */
  myProjects?: InputMaybe<Scalars['Boolean']['input']>;
  /** Show only official CODE projects */
  officialProject?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by a specific project type */
  projectType?: InputMaybe<ProjectType>;
  /** Fulltext search string */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Show projects that are part of x semester */
  semester?: InputMaybe<Scalars['String']['input']>;
  /** Show projects that are archived */
  showArchived?: InputMaybe<Scalars['Boolean']['input']>;
  /** Show unofficial projects in the list */
  unOfficialProject?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type ProjectInvite = {
  __typename?: 'ProjectInvite';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isSponsor?: Maybe<Scalars['Boolean']['output']>;
  project?: Maybe<Project>;
  role?: Maybe<Scalars['String']['output']>;
  sender?: Maybe<User>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

/** Project invite user input */
export type ProjectInviteUserInput = {
  /** Boolean indicating whether or not this invited user is a project sponsor */
  isSponsor: Scalars['Boolean']['input'];
  /** Role this user is expected to play while working on this project */
  role: Scalars['String']['input'];
  /** The userId of the user to be added to this project */
  userId: Scalars['ID']['input'];
};

export type ProjectMembership = {
  __typename?: 'ProjectMembership';
  createdAt: Scalars['DateTime']['output'];
  endTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isOwner?: Maybe<Scalars['Boolean']['output']>;
  keyLearnings?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
  responsibilities?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  startDate: Scalars['DateTime']['output'];
  student?: Maybe<User>;
  tools?: Maybe<Array<Tag>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProjectOutlineTemplate = {
  __typename?: 'ProjectOutlineTemplate';
  /** Template ID */
  id?: Maybe<Scalars['String']['output']>;
  /** Name of the template */
  name?: Maybe<Scalars['String']['output']>;
  /** Markdown template */
  template?: Maybe<Scalars['String']['output']>;
};

export type ProjectPermissions = {
  __typename?: 'ProjectPermissions';
  canEdit: Scalars['Boolean']['output'];
  canManage: Scalars['Boolean']['output'];
};

export enum ProjectRequirements {
  Any = 'ANY',
  Official = 'OFFICIAL',
  Optional = 'OPTIONAL',
}

export type ProjectTeamMemberInput = {
  avatarUrl: Scalars['String']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  role: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export enum ProjectType {
  Capstone = 'CAPSTONE',
  Code = 'CODE',
  CoreSolo = 'CORE_SOLO',
  CoreTeam = 'CORE_TEAM',
  Orientation = 'ORIENTATION',
  Unofficial = 'UNOFFICIAL',
}

export type ProjectUpdate = {
  __typename?: 'ProjectUpdate';
  allowComments: Scalars['Boolean']['output'];
  comments: Array<UpdateComment>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  imageUrls: Array<Scalars['String']['output']>;
  needsFeedback: Scalars['Boolean']['output'];
  needsHelp: Scalars['Boolean']['output'];
  project?: Maybe<Project>;
  tags: Array<Tag>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type ProjectUpdateFilter = {
  /** Show projects update that needs feedback */
  needFeedback?: InputMaybe<Scalars['Boolean']['input']>;
  /** Show projects update that needs help */
  needHelp?: InputMaybe<Scalars['Boolean']['input']>;
  /** Fulltext search string */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Fulltext search string for tags */
  tagSearch?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectUpdateInput = {
  allowComments: Scalars['Boolean']['input'];
  content: Scalars['String']['input'];
  needsFeedback?: InputMaybe<Scalars['Boolean']['input']>;
  needsHelp?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export enum ProposalStatus {
  Assessing = 'ASSESSING',
  Declined = 'DECLINED',
  Proposed = 'PROPOSED',
  Registered = 'REGISTERED',
  Revoked = 'REVOKED',
  Scheduled = 'SCHEDULED',
}

export type PublishedModuleHandin = {
  __typename?: 'PublishedModuleHandin';
  id?: Maybe<Scalars['ID']['output']>;
  moduleHandin?: Maybe<ModuleHandin>;
  /** Amount of tasks that are yet to be submitted */
  outstandingHandins?: Maybe<Scalars['Int']['output']>;
  /** Amount of submitted tasks */
  submittedHandins?: Maybe<Scalars['Int']['output']>;
};

export type PublishedModuleHandinFilter = {
  /** Show all Handins related to specific module */
  module?: InputMaybe<Scalars['ID']['input']>;
  /** Show all Handins related to specific module identifier */
  moduleIdentifier?: InputMaybe<Scalars['String']['input']>;
  /** Only show handins that were created by me */
  publishedByMe?: InputMaybe<Scalars['Boolean']['input']>;
  /** Fulltext search string */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Show all Handins related to specific semesterModule */
  semesterModule?: InputMaybe<Scalars['ID']['input']>;
};

export type Query = {
  __typename?: 'Query';
  /** List upcoming academic events */
  academicEvents?: Maybe<Array<Maybe<Event>>>;
  activeSemesterModule?: Maybe<SemesterModule>;
  /** Returns all AnnouncementMessages */
  announcementMessages: Array<AnnouncementMessage>;
  /** Get a single assessment with the given assessmentId */
  assessment?: Maybe<Assessment>;
  /** Get assessment statistics */
  assessmentStatistics?: Maybe<AssessmentStatistics>;
  /** List assessments for a particular user filterable by proposalStatus */
  assessments: Array<Assessment>;
  auditEntries: Array<AuditEntry>;
  /** List all module current coordinators */
  coordinatorUsers: Array<User>;
  /** List all unsubmitted hand-ins for this user */
  currentHandins: Array<UserHandin>;
  /** Count all unsubmitted hand-ins for this user */
  currentHandinsCount: Scalars['Int']['output'];
  currentSemester?: Maybe<Semester>;
  currentSemesterModules?: Maybe<Array<ViewerSemesterModule>>;
  currentSemesterModulesCount: Scalars['Int']['output'];
  department: Department;
  departments: Array<Department>;
  /** List early assessment proposals for a given user */
  earlyAssessmentProposals: Array<Assessment>;
  /** List early assessment proposals for a given user */
  earlyAssessmentProposalsCount: Scalars['Int']['output'];
  /** Get ECTS statistics */
  ectsStatistics?: Maybe<Array<EctsStatistic>>;
  /** Get details of a single event */
  event: Event;
  /** Get details of an event group by event group ID */
  eventGroup: EventGroup;
  /** List event groups */
  eventGroups: Array<EventGroup>;
  /** Counts event groups for pagination */
  eventGroupsCount: Scalars['Int']['output'];
  /** List events visible to the currently logged in user */
  events: Array<Event>;
  followedProjectUpdates?: Maybe<Array<ProjectUpdate>>;
  /** List forwarded assessments for a given user */
  forwardedAssessments: Array<Assessment>;
  /** Counts forwarded assessments for pagination */
  forwardedAssessmentsCount: Scalars['Int']['output'];
  getObjectUrl: Scalars['String']['output'];
  /** Gets the semester wide hand-in deadline for a module */
  handinDeadline?: Maybe<Scalars['DateTime']['output']>;
  importantSemesterDate?: Maybe<ImportantSemesterDate>;
  latestModuleDescription?: Maybe<SemesterModule>;
  /** Get details of a learning resource */
  learningResource: LearningResource;
  /** List learning resources */
  learningResources: Array<LearningResource>;
  /** Get the currently logged in user's details */
  me: User;
  module: Module;
  /** Get module and assessment proposal statistics */
  moduleAndAssessmentProposalStatistics?: Maybe<
    Array<ModuleAndAssessmentProposalStatistic>
  >;
  /** Get module and assessment statistics */
  moduleAndAssessmentStatistics?: Maybe<Array<ModuleAndAssessmentStatistic>>;
  moduleHandbook: ModuleHandbook;
  moduleHandbookModule: ModuleHandbookModule;
  moduleHandbookModules: Array<ModuleHandbookModule>;
  moduleHandbookModulesByHandbook?: Maybe<Array<Maybe<ModuleHandbookModule>>>;
  moduleHandbooks: Array<ModuleHandbook>;
  moduleHandbooksCount: Scalars['Int']['output'];
  /** Get details of a hand-in */
  moduleHandin?: Maybe<ModuleHandin>;
  modules: Array<Module>;
  modulesCount: Scalars['Int']['output'];
  /** Get assessment statistics for a given user */
  myAssessmentStatistics?: Maybe<AssessmentStatistics>;
  /** List user's assessments */
  myAssessments: Array<Assessment>;
  /** Counts total number of myAssessments-Records */
  myAssessmentsCount: Scalars['Int']['output'];
  /** Lists event groups of the current user - where current user is organizer or is attending */
  myEventGroups: Array<EventGroup>;
  /** Returns ECTS statistics by module type. */
  myModuleData?: Maybe<MyStudyData>;
  /** Returns the users most recent six `Notification`s */
  myNotifications: Array<Notification>;
  myProjects?: Maybe<Array<Project>>;
  myProjectsAvailableForAssessments?: Maybe<Array<Project>>;
  /** Get a list of published assessments */
  myPublishedAssessments: Array<Assessment>;
  mySemesterModules?: Maybe<Array<Maybe<ViewerSemesterModule>>>;
  mySemesterModulesCount: Scalars['Int']['output'];
  mySettings?: Maybe<UserSettings>;
  /** Querying all of the profs sponsored projects */
  mySponsoredProjects: Array<Project>;
  /** Returns all modules the user has been assessed in so far along with all published assessments */
  myStudies?: Maybe<Array<Maybe<MyStudiesModule>>>;
  /** Returns a total count of all modules that have been passed and ECTS that were collected. */
  myTotalModuleStats?: Maybe<MyTotalModuleStats>;
  /** Get a list of upcoming assessments for a user */
  myUpcomingAssessments: Array<Assessment>;
  /** Counts myUpcomingAssessments for pagination */
  myUpcomingAssessmentsCount: Scalars['Int']['output'];
  /** List upcoming events that concern the currently logged in user - where the user is an event organizer or attendee */
  myUpcomingEvents?: Maybe<Array<Maybe<Event>>>;
  nextSemester?: Maybe<Semester>;
  /** List upcoming non-academic events */
  nonAcademicEvents?: Maybe<Array<Maybe<Event>>>;
  partnerCompany?: Maybe<PartnerCompany>;
  /** Get a presigned S3 upload URL to be used in the frontend to upload a learning resource file */
  presignedLearningResourceUploadUrl?: Maybe<Scalars['String']['output']>;
  professorSemesterModules?: Maybe<Array<Maybe<SemesterModule>>>;
  /** List all professors */
  professors: Array<User>;
  project: Project;
  projectApprovals?: Maybe<Array<Project>>;
  projectApprovalsCount: Scalars['Int']['output'];
  projectInvites: Array<ProjectInvite>;
  projectInvitesCount: Scalars['Int']['output'];
  projectOutlineTemplate?: Maybe<ProjectOutlineTemplate>;
  projectOutlineTemplates?: Maybe<Array<ProjectOutlineTemplate>>;
  /** get all project updates */
  projectUpdates?: Maybe<Array<ProjectUpdate>>;
  /** get project updates by project id */
  projectUpdatesByProject?: Maybe<Array<ProjectUpdate>>;
  /** counts project updates for pagination */
  projectUpdatesCount: Scalars['Int']['output'];
  projectUpdatesTags?: Maybe<Array<Tag>>;
  projects: Array<Project>;
  projectsCount: Scalars['Int']['output'];
  /** Get all published hand-ins / hand-ins visible to the current user */
  publishedModuleHandins?: Maybe<Array<PublishedModuleHandin>>;
  /** Count all published hand-ins / hand-ins visible to the current user */
  publishedModuleHandinsCount: Scalars['Int']['output'];
  putObjectUrl?: Maybe<Scalars['String']['output']>;
  semester?: Maybe<Semester>;
  semesterModule?: Maybe<SemesterModule>;
  semesterModules: Array<SemesterModule>;
  semesterModulesBySemester?: Maybe<Array<Maybe<SemesterModule>>>;
  semesterModulesBySemesterCount: Scalars['Int']['output'];
  semesters: Array<Semester>;
  semestersCount: Scalars['Int']['output'];
  /** Get a signed S3 URL used to download a learning resource file */
  signedLearningResourceLink?: Maybe<Scalars['String']['output']>;
  /** Returns the student handbook overview. */
  studentHandbookOverview?: Maybe<HandbookOverviewData>;
  /** List all students */
  students: Array<User>;
  /** Counts all students */
  studentsCount: Scalars['Int']['output'];
  studyPrograms: Array<StudyProgram>;
  /** List all of the current user's hand-in submissions */
  submittedHandins: Array<UserHandin>;
  /** Count all of the current user's hand-in submissions */
  submittedHandinsCount: Scalars['Int']['output'];
  syncSemesterPlanner?: Maybe<SemesterPlanner>;
  tags: Array<Tag>;
  /** Get all event groups which have no related modules */
  unassignedEventGroupsByModule: Array<EventGroup>;
  /** List unassigned events accessible by the currently logged in user */
  unassignedEvents: Array<Event>;
  /** List unassigned learning resources by semester module ID */
  unassignedLearningResourcesByModule: Array<LearningResource>;
  underMaintanance: Scalars['Boolean']['output'];
  /** List all upcoming events visible to the currently logged in user */
  upcomingEvents: Array<Event>;
  /** Get a user's details based on the user's ID */
  user: User;
  /** counts users list for pagination */
  userCount: Scalars['Int']['output'];
  /** Get details of a single hand-in submission */
  userHandin?: Maybe<UserHandin>;
  /** List all handins that can be assessed by the current user */
  userHandinsTable: Array<UserHandin>;
  /** Count all handins that can be assessed by the current user */
  userHandinsTableCount: Scalars['Int']['output'];
  /** Returns all distinct user skills */
  userSkills: Array<UserSkill>;
  /** List all registered users */
  users: Array<User>;
};

export type QueryActiveSemesterModuleArgs = {
  semesterModuleId: Scalars['ID']['input'];
};

export type QueryAssessmentArgs = {
  assessmentId: Scalars['ID']['input'];
};

export type QueryAssessmentsArgs = {
  proposalStatus?: InputMaybe<ProposalStatus>;
};

export type QueryAuditEntriesArgs = {
  id: Scalars['ID']['input'];
  type: Scalars['String']['input'];
};

export type QueryCurrentHandinsArgs = {
  filter?: InputMaybe<ModuleHandinFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type QueryCurrentHandinsCountArgs = {
  filter?: InputMaybe<ModuleHandinFilter>;
};

export type QueryCurrentSemesterModulesArgs = {
  filter?: InputMaybe<SemesterModuleFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type QueryCurrentSemesterModulesCountArgs = {
  filter?: InputMaybe<SemesterModuleFilter>;
};

export type QueryDepartmentArgs = {
  departmentId: Scalars['ID']['input'];
};

export type QueryEarlyAssessmentProposalsArgs = {
  filter?: InputMaybe<AssessmentFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type QueryEarlyAssessmentProposalsCountArgs = {
  filter?: InputMaybe<AssessmentFilter>;
};

export type QueryEventArgs = {
  eventId: Scalars['ID']['input'];
};

export type QueryEventGroupArgs = {
  eventGroupId: Scalars['ID']['input'];
};

export type QueryEventGroupsArgs = {
  attending?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<EventGroupFilter>;
  organizing?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<OffsetPaginationInput>;
  type?: InputMaybe<EventGroupType>;
};

export type QueryEventGroupsCountArgs = {
  attending?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<EventGroupFilter>;
  organizing?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<EventGroupType>;
};

export type QueryForwardedAssessmentsArgs = {
  filter?: InputMaybe<AssessmentFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type QueryForwardedAssessmentsCountArgs = {
  filter?: InputMaybe<AssessmentFilter>;
};

export type QueryGetObjectUrlArgs = {
  awsKey: Scalars['String']['input'];
};

export type QueryHandinDeadlineArgs = {
  semesterModuleId?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryImportantSemesterDateArgs = {
  id: Scalars['ID']['input'];
};

export type QueryLatestModuleDescriptionArgs = {
  moduleShortCode?: InputMaybe<Scalars['String']['input']>;
  semesterId?: InputMaybe<Scalars['ID']['input']>;
  semesterModuleId: Scalars['ID']['input'];
};

export type QueryLearningResourceArgs = {
  learningResourceId: Scalars['ID']['input'];
};

export type QueryModuleArgs = {
  moduleId: Scalars['ID']['input'];
};

export type QueryModuleHandbookArgs = {
  moduleHandbookId: Scalars['ID']['input'];
};

export type QueryModuleHandbookModuleArgs = {
  moduleHandbookModuleId: Scalars['ID']['input'];
};

export type QueryModuleHandbookModulesByHandbookArgs = {
  moduleHandbookId: Scalars['ID']['input'];
};

export type QueryModuleHandbooksArgs = {
  filter?: InputMaybe<ModuleHandbookFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type QueryModuleHandbooksCountArgs = {
  filter?: InputMaybe<ModuleHandbookFilter>;
};

export type QueryModuleHandinArgs = {
  moduleHandinId: Scalars['ID']['input'];
};

export type QueryModulesArgs = {
  currentSemesterOnly?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ModuleFilter>;
  futureSemesterOnly?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type QueryModulesCountArgs = {
  currentSemesterOnly?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ModuleFilter>;
  futureSemesterOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryMyAssessmentsArgs = {
  assessmentStyle?: InputMaybe<AssessmentStyle>;
  filter?: InputMaybe<AssessmentFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
  proposalStatus?: InputMaybe<ProposalStatus>;
  sortKey?: InputMaybe<Scalars['String']['input']>;
};

export type QueryMyAssessmentsCountArgs = {
  assessmentStyle?: InputMaybe<AssessmentStyle>;
  filter?: InputMaybe<AssessmentFilter>;
  proposalStatus?: InputMaybe<ProposalStatus>;
};

export type QueryMyEventGroupsArgs = {
  currentSemesterOnly?: InputMaybe<Scalars['Boolean']['input']>;
  departmentAbbreviation?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<EventGroupFilter>;
  type?: InputMaybe<EventGroupType>;
};

export type QueryMyModuleDataArgs = {
  onlyMandatory?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryMyProjectsAvailableForAssessmentsArgs = {
  semesterModuleId: Scalars['ID']['input'];
};

export type QueryMyPublishedAssessmentsArgs = {
  moduleId?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryMySemesterModulesArgs = {
  filter?: InputMaybe<SemesterModuleFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type QueryMySemesterModulesCountArgs = {
  filter?: InputMaybe<SemesterModuleFilter>;
};

export type QueryMyStudiesArgs = {
  filter?: InputMaybe<ModuleFilter>;
};

export type QueryMyTotalModuleStatsArgs = {
  onlyMandatory?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryMyUpcomingAssessmentsArgs = {
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type QueryMyUpcomingEventsArgs = {
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type QueryPartnerCompanyArgs = {
  slug: Scalars['String']['input'];
};

export type QueryPresignedLearningResourceUploadUrlArgs = {
  createdAt: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
  mimeType: Scalars['String']['input'];
};

export type QueryProjectArgs = {
  projectId: Scalars['ID']['input'];
};

export type QueryProjectApprovalsArgs = {
  filter?: InputMaybe<ProjectApprovalsFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type QueryProjectApprovalsCountArgs = {
  filter?: InputMaybe<ProjectApprovalsFilter>;
};

export type QueryProjectInvitesArgs = {
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type QueryProjectOutlineTemplateArgs = {
  templatePageId: Scalars['String']['input'];
};

export type QueryProjectUpdatesArgs = {
  filter?: InputMaybe<ProjectUpdateFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type QueryProjectUpdatesByProjectArgs = {
  projectId?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryProjectUpdatesCountArgs = {
  filter?: InputMaybe<ProjectUpdateFilter>;
};

export type QueryProjectsArgs = {
  filter?: InputMaybe<ProjectFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type QueryProjectsCountArgs = {
  filter?: InputMaybe<ProjectFilter>;
};

export type QueryPublishedModuleHandinsArgs = {
  filter?: InputMaybe<PublishedModuleHandinFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type QueryPublishedModuleHandinsCountArgs = {
  filter?: InputMaybe<PublishedModuleHandinFilter>;
};

export type QueryPutObjectUrlArgs = {
  createdAt: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
  mimeType: Scalars['String']['input'];
  uploadTarget: Scalars['String']['input'];
};

export type QuerySemesterArgs = {
  semesterId: Scalars['ID']['input'];
};

export type QuerySemesterModuleArgs = {
  moduleIdentifier?: InputMaybe<Scalars['String']['input']>;
  moduleShortCode?: InputMaybe<Scalars['String']['input']>;
  semesterModuleId?: InputMaybe<Scalars['ID']['input']>;
};

export type QuerySemesterModulesArgs = {
  currentSemesterOnly?: InputMaybe<Scalars['Boolean']['input']>;
  futureSemesterOnly?: InputMaybe<Scalars['Boolean']['input']>;
  moduleHandbookId?: InputMaybe<Scalars['ID']['input']>;
  semesterId?: InputMaybe<Scalars['ID']['input']>;
};

export type QuerySemesterModulesBySemesterArgs = {
  filter?: InputMaybe<SemesterModuleFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
  semesterId: Scalars['ID']['input'];
};

export type QuerySemesterModulesBySemesterCountArgs = {
  filter?: InputMaybe<SemesterModuleFilter>;
  semesterId: Scalars['ID']['input'];
};

export type QuerySemestersArgs = {
  fromCurrentSemester?: InputMaybe<Scalars['Boolean']['input']>;
  fromPreviousSemester?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type QuerySemestersCountArgs = {
  fromCurrentSemester?: InputMaybe<Scalars['Boolean']['input']>;
  fromPreviousSemester?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QuerySignedLearningResourceLinkArgs = {
  createdAt: Scalars['String']['input'];
  key: Scalars['String']['input'];
};

export type QueryStudentHandbookOverviewArgs = {
  moduleHandbookId?: InputMaybe<Scalars['ID']['input']>;
  userId: Scalars['ID']['input'];
};

export type QueryStudentsArgs = {
  filter?: InputMaybe<StudentFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type QueryStudentsCountArgs = {
  filter?: InputMaybe<StudentFilter>;
};

export type QuerySubmittedHandinsArgs = {
  filter?: InputMaybe<ModuleHandinFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type QuerySubmittedHandinsCountArgs = {
  filter?: InputMaybe<ModuleHandinFilter>;
};

export type QuerySyncSemesterPlannerArgs = {
  syncAssessments?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryTagsArgs = {
  category?: InputMaybe<TagCategory>;
};

export type QueryUnassignedEventGroupsByModuleArgs = {
  pagination?: InputMaybe<OffsetPaginationInput>;
  semesterModuleId: Scalars['ID']['input'];
};

export type QueryUnassignedLearningResourcesByModuleArgs = {
  filter?: InputMaybe<LearningResourceFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
  semesterModuleId: Scalars['ID']['input'];
};

export type QueryUserArgs = {
  userId: Scalars['ID']['input'];
};

export type QueryUserCountArgs = {
  filter?: InputMaybe<UserFilter>;
};

export type QueryUserHandinArgs = {
  handinId: Scalars['ID']['input'];
};

export type QueryUserHandinsTableArgs = {
  filter?: InputMaybe<UserHandinTableFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
  sortKey?: InputMaybe<Scalars['String']['input']>;
};

export type QueryUserHandinsTableCountArgs = {
  filter?: InputMaybe<UserHandinTableFilter>;
};

export type QueryUsersArgs = {
  filter?: InputMaybe<UserFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export enum ResourceMedium {
  Article = 'ARTICLE',
  Audio = 'AUDIO',
  Book = 'BOOK',
  Course = 'COURSE',
  Meta = 'META',
  Misc = 'MISC',
  Video = 'VIDEO',
}

export type Semester = {
  __typename?: 'Semester';
  academicEventRegistrationEndDate?: Maybe<Scalars['DateTime']['output']>;
  academicEventRegistrationStartDate?: Maybe<Scalars['DateTime']['output']>;
  activeAcademicEventRegistrationPhase?: Maybe<Scalars['Boolean']['output']>;
  activeModuleEdit?: Maybe<Scalars['Boolean']['output']>;
  activePPP?: Maybe<Scalars['Boolean']['output']>;
  activeReassessmentRegistrationPhase?: Maybe<Scalars['Boolean']['output']>;
  barcampSlotBookingEndDate?: Maybe<Scalars['DateTime']['output']>;
  barcampSlotBookingStartDate?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  endDate: Scalars['DateTime']['output'];
  handinCustomDeadline?: Maybe<Scalars['JSON']['output']>;
  handinIdDeadline?: Maybe<Scalars['DateTime']['output']>;
  handinIsDeadline?: Maybe<Scalars['DateTime']['output']>;
  handinOsDeadline?: Maybe<Scalars['DateTime']['output']>;
  handinPmDeadline?: Maybe<Scalars['DateTime']['output']>;
  handinSeDeadline?: Maybe<Scalars['DateTime']['output']>;
  handinStsDeadline?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  importantSemesterDates?: Maybe<Array<Maybe<ImportantSemesterDateView>>>;
  isActive: Scalars['Boolean']['output'];
  isOutlineHandinActive: Scalars['Boolean']['output'];
  isPitchActive: Scalars['Boolean']['output'];
  moduleAlternativeRegistrationEndDate?: Maybe<Scalars['DateTime']['output']>;
  moduleAlternativeRegistrationStartDate?: Maybe<Scalars['DateTime']['output']>;
  moduleAssessmentPhaseEndDate?: Maybe<Scalars['DateTime']['output']>;
  moduleAssessmentPhaseStartDate?: Maybe<Scalars['DateTime']['output']>;
  moduleEarlyRegistrationEndDate?: Maybe<Scalars['DateTime']['output']>;
  moduleEarlyRegistrationStartDate?: Maybe<Scalars['DateTime']['output']>;
  moduleEditDeadline?: Maybe<Scalars['DateTime']['output']>;
  moduleGradePublishedDeadline?: Maybe<Scalars['DateTime']['output']>;
  moduleReassessmentPhaseEndDate?: Maybe<Scalars['DateTime']['output']>;
  moduleReassessmentPhaseStartDate?: Maybe<Scalars['DateTime']['output']>;
  moduleReassessmentRegistrationPhaseEndDate?: Maybe<
    Scalars['DateTime']['output']
  >;
  moduleReassessmentRegistrationPhaseStartDate?: Maybe<
    Scalars['DateTime']['output']
  >;
  moduleStandardRegistrationEndDate?: Maybe<Scalars['DateTime']['output']>;
  moduleStandardRegistrationStartDate?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  nextSemester?: Maybe<Semester>;
  pppEndDate?: Maybe<Scalars['DateTime']['output']>;
  pppStartDate?: Maybe<Scalars['DateTime']['output']>;
  previousSemester?: Maybe<Semester>;
  projectApplicationPhaseEndDate?: Maybe<Scalars['DateTime']['output']>;
  projectApplicationPhaseStartDate?: Maybe<Scalars['DateTime']['output']>;
  projectConsultantInvitationDeadline?: Maybe<Scalars['DateTime']['output']>;
  projectIdeaHandInEndDate?: Maybe<Scalars['DateTime']['output']>;
  projectIdeaHandInStartDate?: Maybe<Scalars['DateTime']['output']>;
  projectOutlineHandInEndDate?: Maybe<Scalars['DateTime']['output']>;
  projectOutlineHandInStartDate?: Maybe<Scalars['DateTime']['output']>;
  projectSignoffDeadline?: Maybe<Scalars['DateTime']['output']>;
  projectSignoffRequestDeadline?: Maybe<Scalars['DateTime']['output']>;
  projects?: Maybe<Array<Project>>;
  startDate: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SemesterImportantSemesterDatesArgs = {
  filter?: InputMaybe<ImportantSemesterDateFilter>;
};

export type SemesterCreationInput = {
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  endDate: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
};

export enum SemesterDateVisibility {
  All = 'ALL',
  FacultyOnly = 'FACULTY_ONLY',
  StudentOnly = 'STUDENT_ONLY',
}

export type SemesterModule = {
  __typename?: 'SemesterModule';
  activeAlternativeRegistrationPhase?: Maybe<Scalars['Boolean']['output']>;
  activeEarlyAssessmentRegistrationPhase?: Maybe<Scalars['Boolean']['output']>;
  activeStandardRegistrationPhase?: Maybe<Scalars['Boolean']['output']>;
  allowProjectLinks?: Maybe<Scalars['Boolean']['output']>;
  allowsEarlyAssessment?: Maybe<Scalars['Boolean']['output']>;
  allowsFoundationAssessment?: Maybe<Scalars['Boolean']['output']>;
  allowsRegistration?: Maybe<Scalars['Boolean']['output']>;
  alternativeAssessmentInstructions: Scalars['String']['output'];
  availableForFoundation?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currentAssessment?: Maybe<Assessment>;
  customRegistrationDeadline?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  disabledAlternativeAssessment?: Maybe<Scalars['Boolean']['output']>;
  earlyAssessmentInstructions?: Maybe<Scalars['String']['output']>;
  eventGroups: Array<EventGroup>;
  foundationAssessmentInstructions?: Maybe<Scalars['String']['output']>;
  grants?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  hasDuplicate?: Maybe<Scalars['Boolean']['output']>;
  highestGrade?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isDraft?: Maybe<Scalars['Boolean']['output']>;
  isNotEdited: Scalars['Boolean']['output'];
  latestAssessment?: Maybe<Assessment>;
  levelExpectations: Scalars['String']['output'];
  module?: Maybe<Module>;
  moduleIdentifier?: Maybe<Scalars['String']['output']>;
  nextModules: Array<SemesterModule>;
  openProposalCount?: Maybe<Scalars['Int']['output']>;
  permissions?: Maybe<SemesterModulePermissions>;
  primaryAssessor?: Maybe<User>;
  projectRequirement?: Maybe<ProjectRequirements>;
  registrationCount?: Maybe<Scalars['Int']['output']>;
  semester?: Maybe<Semester>;
  slackLink?: Maybe<Scalars['String']['output']>;
  standardAssessmentDefaultHandIns: Array<ModuleHandin>;
  standardAssessmentInstructions: Scalars['String']['output'];
  status?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  updates: Array<ModuleUpdate>;
  versions?: Maybe<Array<Maybe<ViewerSemesterModule>>>;
};

export type SemesterModuleLatestAssessmentArgs = {
  declined?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SemesterModuleRegistrationCountArgs = {
  assessmentStyle: AssessmentStyle;
};

export type SemesterModuleFilter = {
  /** Show only modules that allow alternative assessment */
  alternativeAssessment?: InputMaybe<Scalars['Boolean']['input']>;
  /** Show only modules coordinated by the given user */
  coordinator?: InputMaybe<Scalars['ID']['input']>;
  /** Show only modules belonging to the respective department */
  department?: InputMaybe<Scalars['String']['input']>;
  /** Show only modules that allow early assessment */
  earlyAssessment?: InputMaybe<Scalars['Boolean']['input']>;
  /** Show only modules failed by the current user */
  failed?: InputMaybe<Scalars['Boolean']['input']>;
  /** Show only modules which are mandatory/elective for the current user */
  onlyMandatory?: InputMaybe<Scalars['Boolean']['input']>;
  /** Show only modules passed by the current user */
  passed?: InputMaybe<Scalars['Boolean']['input']>;
  /** Fulltext search string */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Abbreviation of the semester, usually `(FS/SS){Year} */
  semester?: InputMaybe<Scalars['String']['input']>;
};

export type SemesterModuleInput = {
  allowProjectLinks?: InputMaybe<Scalars['Boolean']['input']>;
  allowsAlternativeAssessment?: InputMaybe<Scalars['Boolean']['input']>;
  allowsEarlyAssessment?: InputMaybe<Scalars['Boolean']['input']>;
  allowsFoundationAssessment?: InputMaybe<Scalars['Boolean']['input']>;
  allowsRegistration?: InputMaybe<Scalars['Boolean']['input']>;
  alternativeAssessmentInstructions: Scalars['String']['input'];
  customRegistrationDeadline?: InputMaybe<Scalars['DateTime']['input']>;
  description: Scalars['String']['input'];
  earlyAssessmentInstructions?: InputMaybe<Scalars['String']['input']>;
  foundationAssessmentInstructions: Scalars['String']['input'];
  levelExpectations: Scalars['String']['input'];
  linkedHandins?: InputMaybe<Array<Scalars['ID']['input']>>;
  primaryAssessor?: InputMaybe<Scalars['ID']['input']>;
  projectRequirement: ProjectRequirements;
  standardAssessmentInstructions: Scalars['String']['input'];
};

export type SemesterModuleMcInput = {
  eventGroups: Array<Scalars['String']['input']>;
};

export type SemesterModulePermissions = {
  __typename?: 'SemesterModulePermissions';
  canEdit?: Maybe<Scalars['Boolean']['output']>;
  canManage?: Maybe<Scalars['Boolean']['output']>;
  canManageFutureModule?: Maybe<Scalars['Boolean']['output']>;
};

export type SemesterModuleUpdateInput = {
  content: Scalars['String']['input'];
};

export type SemesterPlanner = {
  __typename?: 'SemesterPlanner';
  createdAt: Scalars['DateTime']['output'];
  firstSemester?: Maybe<Semester>;
  id: Scalars['ID']['output'];
  modules?: Maybe<Array<SemesterPlannerModule>>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type SemesterPlannerModule = {
  __typename?: 'SemesterPlannerModule';
  assessment?: Maybe<Assessment>;
  checkList: Scalars['JSON']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  links: Scalars['JSON']['output'];
  module?: Maybe<Module>;
  notes: Scalars['String']['output'];
  projects: Array<Project>;
  semesterPlanner?: Maybe<SemesterPlanner>;
  semestersFromStart: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SemesterPlannerModuleInput = {
  checkList: Scalars['JSON']['input'];
  links: Scalars['JSON']['input'];
  moduleId: Scalars['ID']['input'];
  notes: Scalars['String']['input'];
  semesterPlannerId: Scalars['ID']['input'];
  semestersFromStart: Scalars['Int']['input'];
};

export type SemesterUpdateInput = {
  academicEventRegistrationEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  academicEventRegistrationStartDate?: InputMaybe<Scalars['DateTime']['input']>;
  barcampSlotBookingEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  barcampSlotBookingStartDate?: InputMaybe<Scalars['DateTime']['input']>;
  endDate: Scalars['DateTime']['input'];
  handinCustomDeadline?: InputMaybe<Array<HandinCustomDeadlineInput>>;
  handinIdDeadline?: InputMaybe<Scalars['DateTime']['input']>;
  handinIsDeadline?: InputMaybe<Scalars['DateTime']['input']>;
  handinOsDeadline?: InputMaybe<Scalars['DateTime']['input']>;
  handinPmDeadline?: InputMaybe<Scalars['DateTime']['input']>;
  handinSeDeadline?: InputMaybe<Scalars['DateTime']['input']>;
  handinStsDeadline?: InputMaybe<Scalars['DateTime']['input']>;
  isActive: Scalars['Boolean']['input'];
  moduleAlternativeRegistrationEndDate?: InputMaybe<
    Scalars['DateTime']['input']
  >;
  moduleAlternativeRegistrationStartDate?: InputMaybe<
    Scalars['DateTime']['input']
  >;
  moduleAssessmentPhaseEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  moduleAssessmentPhaseStartDate?: InputMaybe<Scalars['DateTime']['input']>;
  moduleEarlyRegistrationEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  moduleEarlyRegistrationStartDate?: InputMaybe<Scalars['DateTime']['input']>;
  moduleEditDeadline?: InputMaybe<Scalars['DateTime']['input']>;
  moduleGradePublishedDeadline?: InputMaybe<Scalars['DateTime']['input']>;
  moduleReassessmentPhaseEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  moduleReassessmentPhaseStartDate?: InputMaybe<Scalars['DateTime']['input']>;
  moduleReassessmentRegistrationPhaseEndDate?: InputMaybe<
    Scalars['DateTime']['input']
  >;
  moduleReassessmentRegistrationPhaseStartDate?: InputMaybe<
    Scalars['DateTime']['input']
  >;
  moduleStandardRegistrationEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  moduleStandardRegistrationStartDate?: InputMaybe<
    Scalars['DateTime']['input']
  >;
  name: Scalars['String']['input'];
  nextSemester?: InputMaybe<Scalars['ID']['input']>;
  pppEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  pppStartDate?: InputMaybe<Scalars['DateTime']['input']>;
  projectApplicationPhaseEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  projectApplicationPhaseStartDate?: InputMaybe<Scalars['DateTime']['input']>;
  projectConsultantInvitationDeadline?: InputMaybe<
    Scalars['DateTime']['input']
  >;
  projectIdeaHandInEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  projectIdeaHandInStartDate?: InputMaybe<Scalars['DateTime']['input']>;
  projectOutlineHandInEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  projectOutlineHandInStartDate?: InputMaybe<Scalars['DateTime']['input']>;
  projectSignoffDeadline?: InputMaybe<Scalars['DateTime']['input']>;
  projectSignoffRequestDeadline?: InputMaybe<Scalars['DateTime']['input']>;
  startDate: Scalars['DateTime']['input'];
};

export type StudentFilter = {
  department?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type StudentModuleHandbook = {
  __typename?: 'StudentModuleHandbook';
  acceptedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  moduleHandbook?: Maybe<ModuleHandbook>;
  rejectedAt?: Maybe<Scalars['DateTime']['output']>;
  student?: Maybe<User>;
  updatedAt: Scalars['DateTime']['output'];
};

export type StudyProgram = {
  __typename?: 'StudyProgram';
  abbreviation: Scalars['String']['output'];
  backgroundImageUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  moduleHandbooks?: Maybe<Array<ModuleHandbook>>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Tag = {
  __typename?: 'Tag';
  category?: Maybe<TagCategory>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  skillCount: Scalars['Int']['output'];
  skills: Array<UserSkill>;
  updatedAt: Scalars['DateTime']['output'];
};

/** Possible categories tags can fall into. */
export enum TagCategory {
  General = 'GENERAL',
  Method = 'METHOD',
  Resource = 'RESOURCE',
  Technology = 'TECHNOLOGY',
  Tool = 'TOOL',
}

export enum TeachingFormat {
  BachelorsThesis = 'BACHELORS_THESIS',
  CaseStudy = 'CASE_STUDY',
  Colloquium = 'COLLOQUIUM',
  Course = 'COURSE',
  Lecture = 'LECTURE',
  PracticeSession = 'PRACTICE_SESSION',
  ProjectWork = 'PROJECT_WORK',
  Seminar = 'SEMINAR',
  SeminarOrWorkshop = 'SEMINAR_OR_WORKSHOP',
}

export type UnofficialProjectInput = {
  description: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type UpdateComment = {
  __typename?: 'UpdateComment';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  update?: Maybe<ProjectUpdate>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type UpdateHandinInput = {
  assessmentFeedback?: InputMaybe<Scalars['String']['input']>;
  grade?: InputMaybe<Scalars['Float']['input']>;
  handinFeedback?: InputMaybe<Scalars['String']['input']>;
  inMarking?: InputMaybe<Scalars['Boolean']['input']>;
  internalNotes?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  readyForPublishing?: InputMaybe<Scalars['Boolean']['input']>;
  requiresOralAssessment?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateProjectInput = {
  coverUrl?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  isLookingForTeammates: Scalars['Boolean']['input'];
  keyLearnings?: InputMaybe<Scalars['String']['input']>;
  outline: Scalars['String']['input'];
  portfolioDescription?: InputMaybe<Scalars['String']['input']>;
  projectType?: InputMaybe<ProjectType>;
  responsibilities?: InputMaybe<Scalars['String']['input']>;
  semesters: Array<Scalars['String']['input']>;
  sponsor?: InputMaybe<Scalars['ID']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  teamMembers: Array<ProjectTeamMemberInput>;
  title: Scalars['String']['input'];
  tools?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateSemesterPlannerModuleInput = {
  checkList: Scalars['JSON']['input'];
  id: Scalars['ID']['input'];
  links: Scalars['JSON']['input'];
  notes: Scalars['String']['input'];
};

export type UpdateUserProfileInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  githubHandle?: InputMaybe<Scalars['String']['input']>;
  linkedInHandle?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<UserSkillInput>>;
  twitterHandle?: InputMaybe<Scalars['String']['input']>;
};

export type Upload = {
  fileName: Scalars['String']['input'];
  fileType: FileType;
  key: Scalars['String']['input'];
  link: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  /** Whether or not the currently logged in user can edit this user's details */
  canEdit?: Maybe<Scalars['Boolean']['output']>;
  /** Whether or not the currently logged in user can view this user's details */
  canViewDetails?: Maybe<Scalars['Boolean']['output']>;
  consultationCapacity?: Maybe<Scalars['Int']['output']>;
  consultationCount?: Maybe<Scalars['Int']['output']>;
  consultationRequestCount?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currentSession: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  eventGroupParticipations: Array<EventGroupParticipations>;
  firstName: Scalars['String']['output'];
  githubHandle?: Maybe<Scalars['String']['output']>;
  googleChatLink?: Maybe<Scalars['String']['output']>;
  /** List the grants available to this user */
  grants: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inactive?: Maybe<Scalars['Boolean']['output']>;
  lastName: Scalars['String']['output'];
  linkedInHandle?: Maybe<Scalars['String']['output']>;
  /** List the current users's mandatory modules */
  mandatoryModules?: Maybe<Array<Scalars['String']['output']>>;
  moduleHandIns?: Maybe<Array<ModuleHandin>>;
  moduleHandbooks?: Maybe<Array<StudentModuleHandbook>>;
  name: Scalars['String']['output'];
  permissions?: Maybe<Scalars['JSON']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  prevSession: Scalars['DateTime']['output'];
  projectMemberships: Array<ProjectMembership>;
  projectsFollowed: Array<Project>;
  role: UserRole;
  skills: Array<UserSkill>;
  slackId?: Maybe<Scalars['String']['output']>;
  slackLink?: Maybe<Scalars['String']['output']>;
  twitterHandle?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userEventStreamLink?: Maybe<Scalars['String']['output']>;
};

export type UserModuleHandbooksArgs = {
  current?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserFilter = {
  role?: InputMaybe<UserRole>;
  search?: InputMaybe<Scalars['String']['input']>;
  tagSearch?: InputMaybe<Scalars['String']['input']>;
};

export type UserFormComponent = {
  __typename?: 'UserFormComponent';
  content: Scalars['String']['output'];
  handinFormComponent?: Maybe<FormComponent>;
  id: Scalars['ID']['output'];
};

export type UserFormComponentsInput = {
  content: Scalars['String']['input'];
  handinFormComponent: Scalars['ID']['input'];
  type: Scalars['String']['input'];
};

export type UserHandin = {
  __typename?: 'UserHandin';
  createdAt: Scalars['DateTime']['output'];
  deadline?: Maybe<Scalars['DateTime']['output']>;
  feedback?: Maybe<Scalars['String']['output']>;
  handin?: Maybe<ModuleHandin>;
  id: Scalars['ID']['output'];
  /** Gets the latest assessment associated with the module linked to this hand-in */
  latestAssessment?: Maybe<Assessment>;
  /** Current status of the hand-in - whether or not feedback has been given or if the hand-in has been submitted etc. */
  status: HandinStatus;
  submittedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userFormComponents: Array<UserFormComponent>;
  /** Current workflow status of the hand-in - at what stage of marking is the hand-in */
  workflowStatus: WorkflowStatus;
};

export type UserHandinTableFilter = {
  /** Show all hand ins from an assessor with this name */
  assessor?: InputMaybe<Scalars['String']['input']>;
  /** Show all Handins related to specific event */
  event?: InputMaybe<Scalars['ID']['input']>;
  /** Show all userHandins from this moduleHandin */
  handin?: InputMaybe<Scalars['ID']['input']>;
  /** Show all Handins related to specific module */
  module?: InputMaybe<Scalars['ID']['input']>;
  /** Show all Handins related to specific semester */
  semester?: InputMaybe<Scalars['ID']['input']>;
  /** String representing sort order in which to return the assessment results in the form <FIELD>,<asc|desc> */
  sortKey?: InputMaybe<Scalars['String']['input']>;
  /** Show all Handins with a certain status */
  status?: InputMaybe<Scalars['ID']['input']>;
  /** Show all hand ins from a student with this name */
  student?: InputMaybe<Scalars['String']['input']>;
  /** Show all Handins with a certain workflow status */
  workflowStatus?: InputMaybe<WorkflowStatus>;
};

export type UserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  inactive: Scalars['Boolean']['input'];
  lastName: Scalars['String']['input'];
  role: UserRole;
  skills?: InputMaybe<Array<UserSkillInput>>;
};

/** Access/Account Level Roles a user can assume */
export enum UserRole {
  Admin = 'ADMIN',
  Applicant = 'APPLICANT',
  ExaminationOffice = 'EXAMINATION_OFFICE',
  ExternalStudent = 'EXTERNAL_STUDENT',
  FutureStudent = 'FUTURE_STUDENT',
  HeadOfProjects = 'HEAD_OF_PROJECTS',
  Lecturer = 'LECTURER',
  OrientationStudent = 'ORIENTATION_STUDENT',
  Partner = 'PARTNER',
  Professor = 'PROFESSOR',
  RelationsManager = 'RELATIONS_MANAGER',
  Staff = 'STAFF',
  Student = 'STUDENT',
  WorkingStudent = 'WORKING_STUDENT',
}

export type UserSettings = {
  __typename?: 'UserSettings';
  assessmentEmailsEnabled: Scalars['Boolean']['output'];
  consultationCapacity?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserSkill = {
  __typename?: 'UserSkill';
  id: Scalars['ID']['output'];
  isHighlighted?: Maybe<Scalars['Boolean']['output']>;
  skill?: Maybe<Tag>;
  user?: Maybe<User>;
};

export type UserSkillInput = {
  isHighlighted?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

/** This module type is returned if the viewer coordinates this module. */
export type ViewerCoordinatedSemesterModule = ViewerSemesterModule & {
  __typename?: 'ViewerCoordinatedSemesterModule';
  /** Indicate whether or not registration is allowed and open for this module */
  allowsRegistration?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  /** Indicates whether a custom registration deadline is set instead of the default one */
  customRegistrationDeadline?: Maybe<Scalars['DateTime']['output']>;
  /**
   * A large text describing everything the student needs to know about this  module. These
   * instructions might be different each semester.
   */
  description?: Maybe<Scalars['String']['output']>;
  eventGroups?: Maybe<Array<EventGroup>>;
  hasDuplicate?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** Indicates whether or not ths module is in draft status */
  isDraft?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The module for this semester module. A semester module is a specific offering of a module
   * during a certain semester. Which module is offered can be queried through this field.
   */
  module?: Maybe<Module>;
  /** Module identifier for the semester module */
  moduleIdentifier?: Maybe<Scalars['String']['output']>;
  /** Number of alternative assessment proposals for this module. */
  openAssessmentsCount?: Maybe<Scalars['Int']['output']>;
  /** Number of alternative assessment proposals for this module. */
  openProposalsCount?: Maybe<Scalars['Int']['output']>;
  primaryAssessor?: Maybe<User>;
  semester?: Maybe<Semester>;
  updatedAt: Scalars['DateTime']['output'];
};

/**
 * This interface type is returned for semester modules. If a module is offered during a certain
 * semester, a new semester module entity is created. It can be used to connect specific data
 * about this module during a semester.
 */
export type ViewerSemesterModule = {
  /** Indicate whether or not registration is allowed and open for this module */
  allowsRegistration?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  /** Indicates whether a custom registration deadline is set instead of the default one */
  customRegistrationDeadline?: Maybe<Scalars['DateTime']['output']>;
  /**
   * A large text describing everything the student needs to know about this  module. These
   * instructions might be different each semester.
   */
  description?: Maybe<Scalars['String']['output']>;
  eventGroups?: Maybe<Array<EventGroup>>;
  hasDuplicate?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** Indicates whether or not ths module is in draft status */
  isDraft?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The module for this semester module. A semester module is a specific offering of a module
   * during a certain semester. Which module is offered can be queried through this field.
   */
  module?: Maybe<Module>;
  /** Module identifier for the semester module */
  moduleIdentifier?: Maybe<Scalars['String']['output']>;
  primaryAssessor?: Maybe<User>;
  semester?: Maybe<Semester>;
  updatedAt: Scalars['DateTime']['output'];
};

/**
 * This module type is returned if the viewer is enrolled in this module or has been enrolled in the past. Module
 * assessments can be taken again to improve the grade, therefore a module can have a passed grade and at the same
 * time be in a `REGISTERED` state.
 */
export type ViewerTakenSemesterModule = ViewerSemesterModule & {
  __typename?: 'ViewerTakenSemesterModule';
  /** Indicate whether or not registration is allowed and open for this module */
  allowsRegistration?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currentAssessment?: Maybe<Assessment>;
  /** Indicates whether a custom registration deadline is set instead of the default one */
  customRegistrationDeadline?: Maybe<Scalars['DateTime']['output']>;
  /**
   * A large text describing everything the student needs to know about this  module. These
   * instructions might be different each semester.
   */
  description?: Maybe<Scalars['String']['output']>;
  eventGroups?: Maybe<Array<EventGroup>>;
  hasDuplicate?: Maybe<Scalars['Boolean']['output']>;
  highestGrade?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** Indicates whether or not ths module is in draft status */
  isDraft?: Maybe<Scalars['Boolean']['output']>;
  latestAssessment?: Maybe<Assessment>;
  /**
   * The module for this semester module. A semester module is a specific offering of a module
   * during a certain semester. Which module is offered can be queried through this field.
   */
  module?: Maybe<Module>;
  /** Module identifier for the semester module */
  moduleIdentifier?: Maybe<Scalars['String']['output']>;
  primaryAssessor?: Maybe<User>;
  semester?: Maybe<Semester>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

/**
 * This module type is returned if the viewer is enrolled in this module or has been enrolled in the past. Module
 * assessments can be taken again to improve the grade, therefore a module can have a passed grade and at the same
 * time be in a `REGISTERED` state.
 */
export type ViewerTakenSemesterModuleLatestAssessmentArgs = {
  declined?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * This module is returned for modules, that are not taken or coordinated by the viewer. This is the type that acts as
 * a default case and only implements the standard fields if the interface.
 */
export type ViewerUnassociatedSemesterModule = ViewerSemesterModule & {
  __typename?: 'ViewerUnassociatedSemesterModule';
  /** Indicate whether or not registration is allowed and open for this module */
  allowsRegistration?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  /** Indicates whether a custom registration deadline is set instead of the default one */
  customRegistrationDeadline?: Maybe<Scalars['DateTime']['output']>;
  /**
   * A large text describing everything the student needs to know about this  module. These
   * instructions might be different each semester.
   */
  description?: Maybe<Scalars['String']['output']>;
  eventGroups?: Maybe<Array<EventGroup>>;
  hasDuplicate?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** Indicates whether or not ths module is in draft status */
  isDraft?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The module for this semester module. A semester module is a specific offering of a module
   * during a certain semester. Which module is offered can be queried through this field.
   */
  module?: Maybe<Module>;
  /** Module identifier for the semester module */
  moduleIdentifier?: Maybe<Scalars['String']['output']>;
  primaryAssessor?: Maybe<User>;
  semester?: Maybe<Semester>;
  updatedAt: Scalars['DateTime']['output'];
};

/** Computed Status indicating the state the assessment is in at the moment */
export enum WorkflowStatus {
  InMarking = 'IN_MARKING',
  Published = 'PUBLISHED',
  ReadyForPublishing = 'READY_FOR_PUBLISHING',
  ReferredToEo = 'REFERRED_TO_EO',
  Registered = 'REGISTERED',
  Unmarked = 'UNMARKED',
}
