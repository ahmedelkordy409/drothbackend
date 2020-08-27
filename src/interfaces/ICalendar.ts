interface CDate {
    date: Date;
    dateTime: String;
    timeZone: String;
}

interface Attendees {
    email: String,
}

export interface ICalendar {
  id:  String;
  summary: String; // tittle
  location: String; // session location (online / in center /other place )
  description: String;
  start: CDate;
  end: CDate;
  attendees: Attendees[];

}


export interface ICalendarInputDTO {
  summary: String; // tittle
  location: String; // session location (online / in center /other place )
  description: String;
}
