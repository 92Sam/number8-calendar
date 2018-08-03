import { Component, OnInit } from '@angular/core';
import { CountrysService } from './countrys.service';
import { FormsModule } from '@angular/forms';

class calendarModel {
	date: string;
	numberDays: number;
	countrySelected: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
	private countrys:Array<string>;
	private dateRangesComponent:object;
	private dateRangesKeys:object;

	private calendar: calendarModel = {
	    date: "01/01/1992",
	    numberDays: 365,
	    countrySelected:""
	};

  constructor(private countrysService:CountrysService) { }

	ngOnInit() {
		this.countrys = this.countrysService.getCountrys();
	}

	onSubmit() {
		var calendarData = this.calendar;
		var date = new Date(calendarData.date);
		var dateRanges = [];

		var dayOfWeek = date.getDay();
		var numberDayOfWeek = date.getDate();

		if(dayOfWeek != 0){
			var monthNumber = date.getMonth();
			var yearNumber = date.getUTCFullYear();
			for(var i= 0; i < dayOfWeek; i++){
				let objetDate = {
					show:false,
					month:this.getSpecificMonth(monthNumber),
					typeDay:this.verifyTypeDay(yearNumber,monthNumber,numberDayOfWeek),
					year:yearNumber
				};
				dateRanges.push(objetDate);
			}
		}
		dateRanges = this.builtCalendarLogic(date,dateRanges,this.calendar.numberDays,true);

		let dateGrouped = this.groupDaysInMonths(dateRanges);
		this.dateRangesComponent = dateGrouped;
		this.dateRangesKeys = Object.keys(dateGrouped);
	}

	builtCalendarLogic(date,dateRanges,numberDays,show){
		for(var i=0; i <= numberDays; i++){
			let nextDay = date.getDate() + i;
			let month = date.getMonth();
			let year = date.getUTCFullYear();
			let otherDate = new Date(year,month,nextDay);
			let dateBuilt = otherDate.getDate()+'/'+(otherDate.getMonth()+1)+'/'+otherDate.getUTCFullYear();
			let objetDate = {
				show:show,
				day:this.getSpecificDay(otherDate.getDay()),
				dayNumber:otherDate.getDate(),
				typeDay:this.verifyTypeDay(year,otherDate.getMonth(),otherDate.getDate()),
				month:this.getSpecificMonth(otherDate.getMonth()),
				year:otherDate.getUTCFullYear(),
				date:dateBuilt,
				dateUtc:otherDate
			};
			dateRanges.push(objetDate);
		}
		return dateRanges;
	}

	verifyTypeDay(year,month,day){
		console.log(year,month,day)

		var festivalDate = false;
		if(month == 0 && day == 1){
			festivalDate = true;
		}else if(month == 0 && day == 20){
			festivalDate = true;
		}else if(month == 1 && day == 17){
			festivalDate = true;
		}else if(month == 4 && day == 25){
			festivalDate = true;
		}else if(month == 6 && day == 3){
			festivalDate = true;
		}else if(month == 6 && day == 4){
			festivalDate = true;
		}else if(month == 8 && day == 7){
			festivalDate = true;
		}else if(month == 9 && day == 12){
			festivalDate = true;
		}else if(month == 10 && day == 11){
			festivalDate = true;
		}else if(month == 10 && day == 26){
			festivalDate = true;
		}else if(month == 11 && day == 25){
			festivalDate = true;
		}
		return festivalDate;
	}

	groupDaysInMonths(objectDateArray){
		var currentMonth = null;
		var indexMonth = 0;
		var objectDate = {};
		objectDateArray.forEach((date,index)=>{
			if(currentMonth != null){
				if(currentMonth != date.month){
					var dateArray: Array<string> = [];
					var dayOfWeek = date.dateUtc.getDay();
					var numberDayOfWeek = date.dateUtc.getDate();
					indexMonth += 1;
					currentMonth = date.month;

					if(dayOfWeek != 0){
						var monthNumber = date.dateUtc.getMonth();
						var yearNumber = date.dateUtc.getUTCFullYear();
						for(var i= 0; i < dayOfWeek; i++){
							let objetDate: any = {
								show:false,
								month:this.getSpecificMonth(monthNumber),
								typeDay:this.verifyTypeDay(yearNumber,monthNumber,numberDayOfWeek),
								year:yearNumber
							};
							dateArray.push(objetDate);
						}
					}
					dateArray.push(date);
					objectDate[indexMonth] = {
						month:currentMonth,
						year:date.year,
						daysRange: dateArray
					};
				}else{
					(objectDate[indexMonth].daysRange).push(date);
				}
			}else{
				currentMonth = date.month;
				objectDate[indexMonth] = {
					month:currentMonth,
					year:date.year,
					daysRange: [date]
				};
			}
		});
		return objectDate;
	}

	getSpecificDay(day){
		var weekday = new Array(7);
		weekday[0] =  "Sunday";
		weekday[1] = "Monday";
		weekday[2] = "Tuesday";
		weekday[3] = "Wednesday";
		weekday[4] = "Thursday";
		weekday[5] = "Friday";
		weekday[6] = "Saturday";
		return weekday[day];
	}

	getSpecificMonth(months){
		var month = new Array();
		month[0] = "January";
		month[1] = "February";
		month[2] = "March";
		month[3] = "April";
		month[4] = "May";
		month[5] = "June";
		month[6] = "July";
		month[7] = "August";
		month[8] = "September";
		month[9] = "October";
		month[10] = "November";
		month[11] = "December";
		return month[months];
	}

}
