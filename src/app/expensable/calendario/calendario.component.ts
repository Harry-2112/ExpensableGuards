import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})
export class CalendarioComponent implements OnInit {
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  currentDate = new Date();
  currentDay = this.currentDate.getDate();
  monthNumber = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  month!: string;
  year!: string;
  ngOnInit(): void {
    this.month = this.monthNames[this.monthNumber];
    this.year = this.currentYear.toString();
  }

  lastMonth() {
    if (this.monthNumber !== 0) {
      this.monthNumber--;
    } else {
      this.monthNumber = 11;
      this.currentYear--;
    }

    this.setNewDate();
  }

  nextMonth() {
    if (this.monthNumber !== 11) {
      this.monthNumber++;
    } else {
      this.monthNumber = 0;
      this.currentYear++;
    }

    this.setNewDate();
  }
  setNewDate() {
    this.currentDate.setFullYear(
      this.currentYear,
      this.monthNumber,
      this.currentDay
    );
    this.month = this.monthNames[this.monthNumber];
    this.year = this.currentYear.toString();
  }
}
