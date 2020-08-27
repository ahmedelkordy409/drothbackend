"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const events = [
    {
        id: '1gdfgdfgdfgdfhgfh',
        summary: 'Google I/O 2015',
        location: '800 Howard St., San Francisco, CA 94103',
        description: "A chance to hear more about Google's developer products.",
        start: {
            date: new Date('2015-05-28T09:00:00-07:00'),
            dateTime: '2015-05-28T09:00:00-07:00',
            timeZone: 'America/Los_Angeles',
        },
        end: {
            date: new Date('2015-05-28T09:00:00-07:00'),
            dateTime: '2015-05-28T17:00:00-07:00',
            timeZone: 'America/Los_Angeles',
        },
        attendees: [
            {
                email: 'lpage@example.com',
            },
        ],
    },
    {
        id: '2gdfgdfgdfgdfhgfh',
        summary: 'Google I/O 2015',
        location: '800 Howard St., San Francisco, CA 94103',
        description: "A chance to hear more about Google's developer products.",
        start: {
            date: new Date('2015-05-28T09:00:00-07:00'),
            dateTime: '2015-05-28T09:00:00-07:00',
            timeZone: 'America/Los_Angeles',
        },
        end: {
            date: new Date('2015-05-28T09:00:00-07:00'),
            dateTime: '2015-05-28T17:00:00-07:00',
            timeZone: 'America/Los_Angeles',
        },
        attendees: [
            {
                email: 'lpage@example.com',
            },
        ],
    },
    {
        id: '3gdfgdfgdfgdfhgfh',
        summary: 'Google I/O 2015',
        location: '800 Howard St., San Francisco, CA 94103',
        description: "A chance to hear more about Google's developer products.",
        start: {
            date: new Date('2015-05-28T09:00:00-07:00'),
            dateTime: '2015-05-28T09:00:00-07:00',
            timeZone: 'America/Los_Angeles',
        },
        end: {
            date: new Date('2015-05-28T09:00:00-07:00'),
            dateTime: '2015-05-28T17:00:00-07:00',
            timeZone: 'America/Los_Angeles',
        },
        attendees: [
            {
                email: 'lpage@example.com',
            },
        ],
    },
];
let CalendarService = class CalendarService {
    constructor() { }
    /*****************************************************
     * to create new calender called """ sessions """
     * for one time when user
     *
     * @ primision
     * @ param
     *
     ******************************************************/
    /*public async checkOrCreate(
  //  userInputDTO: IUserInputDTO
  ): Promise<{ user: IUser; token: string }> {
  
  //1- check if user has calendar called """ sessions """"
  
  
  
  
  }
  */
    /*****************************************************
     * to create new event as session sheudling
     * Insert into session calendar
     *
     * @ primision
     * @ param
     *
     ******************************************************/
    CreateSession(calendarInputDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSession = events.push(calendarInputDTO);
            console.log('your event added ', newSession);
            return calendarInputDTO;
            // 1- check if user has calendar called """ sessions """"
            // 2- create event with input metadata
            /* 3- in   'attendees': [
            {'email': 'room.owner.email'}, //
          ],*/
            //const calendar = google.calendar({version: 'v3', auth});
            /*calendar.events.insert({
          calendarId: 'primary',
          resource: calendarInputDTO,
        }, (err, event)=> {
          if (err) {
            console.log('There was an error contacting the Calendar service: ' + err);
            return;
          }
          console.log('Event created: %s', event.htmlLink);
        });*/
        });
    }
};
CalendarService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], CalendarService);
exports.default = CalendarService;
/*


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Calendar API.
  authorize(JSON.parse(content), listEvents);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
/*function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
/*function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
/*function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });
}
*/
//# sourceMappingURL=calendar.js.map