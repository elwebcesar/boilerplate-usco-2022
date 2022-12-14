// import './_calendar.scss';

/*
  Author: Jack Ducasse;
  Version: 0.1.0;
  (◠‿◠✿)

  Modified: César Fernández
  Version: 0.2.0;
*/
const Calendar = function(model, options, date, lang, urlEvents){

  // Default Values
  this.Options = {
    Color: '',
    LinkColor: '',
    NavShow: true,
    NavVertical: false,
    NavLocation: '',
    DateTimeShow: true,
    DateTimeFormat: 'mmm, yyyy',
    DatetimeLocation: '',
    EventClick: '',
    EventTargetWholeDay: false,
    DisabledDays: [],
    ModelChange: model
  };

  // Overwriting default values
  for(let key in options){
    this.Options[key] = typeof options[key]=='string'?options[key].toLowerCase():options[key];
  }

  model?this.Model=model:this.Model={};
  this.Today = new Date();

  this.Selected = this.Today
  this.Today.Month = this.Today.getMonth();
  this.Today.Year = this.Today.getFullYear();

  if(date){this.Selected = date}

  this.Selected.Month = this.Selected.getMonth();
  this.Selected.Year = this.Selected.getFullYear();

  this.Selected.Days = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDate();
  this.Selected.FirstDay = new Date(this.Selected.Year, (this.Selected.Month), 1).getDay();
  this.Selected.LastDay = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDay();

  this.Prev = new Date(this.Selected.Year, (this.Selected.Month - 1), 1);

  if(this.Selected.Month==0){this.Prev = new Date(this.Selected.Year-1, 11, 1);}

  this.Prev.Days = new Date(this.Prev.getFullYear(), (this.Prev.getMonth() + 1), 0).getDate();
};

function createCalendar(calendar, element, adjuster, lang, urlEvents){
  if(typeof adjuster !== 'undefined'){
    let newDate = new Date(calendar.Selected.Year, calendar.Selected.Month + adjuster, 1);
    calendar = new Calendar(calendar.Model, calendar.Options, newDate);
    element.innerHTML = '';
  }
  else{
    for(let key in calendar.Options){
      typeof calendar.Options[key] != 'function' && typeof calendar.Options[key] != 'object' && calendar.Options[key]?element.className += " " + key + "-" + calendar.Options[key]:0;
    }
  }

  let months = "";
  let days = "";

  let monthDefault = ["January", "February", "March", "April", "May", "June", "July", "Agosto", "September", "October", "November", "December"];
  let dayDefault = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (lang == "en") {
    months = monthDefault;
    days = dayDefault;
  } else if (lang == "es") {
      months = ["Enero", "Febrero", "Marzo", "Abril", "Meyo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

  } else if (lang == "id") {
      months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
      days = ["Ming", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  } else if (lang == "fr") {
      months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
      days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  } else {
      months = monthDefault;
      days = dayDefault;
  }


  function AddSidebar(){
    const sidebar = document.createElement('div');
    sidebar.className += 'cld-sidebar';

    const monthList = document.createElement('ul');
    monthList.className += 'cld-monthList';

    for(let i = 0; i < months.length - 3; i++) {

      const x = document.createElement('li');
      x.className += 'cld-month';

      let n = i - (4 - calendar.Selected.Month);

      // Account for overflowing month values
      if(n<0){n+=12;}
      else if(n>11){n-=12;}
      // Add Appropriate Class
      if(i==0){
        x.className += ' cld-rwd cld-nav';
        x.addEventListener('click', function(){
          typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
          createCalendar(calendar, element, -1);
        });
        x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,75 100,75 50,0"></polyline></svg>';
      }
      else if(i==months.length - 4){
        x.className += ' cld-fwd cld-nav';
        x.addEventListener('click', function(){
          typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
          createCalendar(calendar, element, 1);
        });
        x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,0 100,0 50,75"></polyline></svg>';
      }
      else{
        if(i < 4){x.className += ' cld-pre';}
        else if(i > 4){x.className += ' cld-post';}
        else{x.className += ' cld-curr';}

        //prevent losing var adj value (for whatever reason that is happening)
        (function () {
          let adj = (i-4);

          //x.addEventListener('click', function(){createCalendar(calendar, element, adj);console.log('kk', adj);} );
          x.addEventListener('click', function(){
            typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
            createCalendar(calendar, element, adj);
          });
          x.setAttribute('style', 'opacity:' + (1 - Math.abs(adj)/4));
          x.innerHTML += months[n].substr(0,3);
        }()); // immediate invocation

        if(n==0){
          const y = document.createElement('li');
          y.className += 'cld-year';
          if(i<5){
            y.innerHTML += calendar.Selected.Year;
          }else{
            y.innerHTML += calendar.Selected.Year + 1;
          }
          monthList.appendChild(y);
        }
      }
      monthList.appendChild(x);
    }
    sidebar.appendChild(monthList);
    if(calendar.Options.NavLocation){
      document.getElementById(calendar.Options.NavLocation).innerHTML = "";
      document.getElementById(calendar.Options.NavLocation).appendChild(sidebar);
    }
    else{element.appendChild(sidebar);}
  }

  const mainSection = document.createElement('div');
  mainSection.className += "cld-main";

  function AddDateTime(){
      const datetime = document.createElement('div');
      datetime.className += "cld-datetime";

      if(calendar.Options.NavShow && !calendar.Options.NavVertical){
        const rwd = document.createElement('button');
        rwd.className += " cld-rwd cld-nav";
        // rwd.addEventListener('click', function(){createCalendar(calendar, element, -1);} );
        rwd.addEventListener('click', function(){
          // createCalendar(calendar, element, -1);
          createCalendar(calendar, element, -1, lang, urlEvents);
        });
        rwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,50 75,0 75,100"></polyline></svg>';
        datetime.appendChild(rwd);
      }

      const today = document.createElement('div');
      today.className += ' today';
      today.innerHTML = months[calendar.Selected.Month] + ", " + calendar.Selected.Year;
      datetime.appendChild(today);

      if(calendar.Options.NavShow && !calendar.Options.NavVertical){
        const fwd = document.createElement('button');
        fwd.className += " cld-fwd cld-nav";
        // fwd.addEventListener('click', function(){createCalendar(calendar, element, 1);} );
        fwd.addEventListener('click', function(){
          // createCalendar(calendar, element, 1);
          createCalendar(calendar, element, 1, lang, urlEvents);
        });
        fwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,0 75,50 0,100"></polyline></svg>';
        datetime.appendChild(fwd);
      }
      
      if(calendar.Options.DatetimeLocation){
        document.getElementById(calendar.Options.DatetimeLocation).innerHTML = "";
        document.getElementById(calendar.Options.DatetimeLocation).appendChild(datetime);
      }
      else{mainSection.appendChild(datetime);}
  }

  function AddLabels(labelsList){
    const labels = document.createElement('ul');
    labels.className = 'cld-labels';

    // var labelsList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for(let i = 0; i < labelsList.length; i++){
      const label = document.createElement('li');
      label.className += "cld-label";
      label.innerHTML = labelsList[i];
      labels.appendChild(label);
    }
    mainSection.appendChild(labels);
  }

  function AddDays(){
    // Create Number Element
    function DayNumber(n){
      const number = document.createElement('p');
      number.className += "cld-number";
      number.innerHTML += n;
      return number;
    }
    const days = document.createElement('ul');
    days.className += "cld-days";
    // Previous Month's Days
    for(let i = 0; i < (calendar.Selected.FirstDay); i++){
      const day = document.createElement('li');
      day.className += "cld-day prevMonth";

      //Disabled Days
      let d = i%7;

      for(let q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }
      }

      let number = DayNumber((calendar.Prev.Days - calendar.Selected.FirstDay) + (i+1));
      day.appendChild(number);

      days.appendChild(day);
    }

    // Current Month's Days
    for(let i = 0; i < calendar.Selected.Days; i++){
      const day = document.createElement('li');
      day.className += "cld-day currMonth";

      //Disabled Days
      let d = (i + calendar.Selected.FirstDay)%7;
      for(let q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }
      }

      let number = DayNumber(i+1);
      let amountEvents = 0;

      // console.log( 'calendar: ', calendar )
      // console.log(i)

      // Check Date against Event Dates
      for(let n = 0; n < calendar.Model.length; n++){
        // var evDate = calendar.Model[n].Date;
        let evDate = calendar.Model[n];
        let toDate = new Date(calendar.Selected.Year, calendar.Selected.Month, (i+1));

        // console.log( 'evDate 1: ', evDate, toDate.getTime() )
        // console.log( 'evDate 1: ',  new Date(evDate), new Date(toDate) )
        // console.log( 'toDate 1: ', toDate.getTime() )
        // console.log(n)s

        let evDateDate = new Date(evDate);
        let evDateStr = `${evDateDate.getFullYear()}-${(evDateDate.getMonth() + 1)}-${evDateDate.getDate()}`;
        // console.log(evDateStr)

        let toDateStr = `${toDate.getFullYear()}-${(toDate.getMonth() + 1)}-${toDate.getDate()}`;
        // console.log(toDateStr)

        // if(evDate.getTime() == toDate.getTime()){
        // if(evDate == toDate.getTime()){
        if(evDateStr === toDateStr){
            // console.log( evDate.getTime() )
          // console.log( toDate.getTime() )
          // console.log( 'typeof: ', typeof(evDate) )
          // console.log('number: ' + number.outerHTML)
          // console.log('number textContent: ' + number.textContent)

          amountEvents++;
          // console.log('amountEvents: ', amountEvents);

          if(amountEvents===1){
            // let dateParse = evDate.getDate() + '-' + (evDate.getMonth() + 1) + '-' + evDate.getFullYear();
            // console.log('dateParse: ', dateParse)
            // let urlEventsLink = `/${lang}/${urlEvents}?date=${dateParse}`;

            let dateEvent = new Date(evDate);
            // console.log(dateEvent.toLocaleString());
            let dateParse = `${dateEvent.getFullYear()}-${(dateEvent.getMonth() + 1)}-${dateEvent.getDate()}`
            let urlEventsLink = `/${lang}/${urlEvents}?date=${dateParse}`;
  
            number.className += " eventday";
  
            const eventLink = document.createElement('a');
            eventLink.setAttribute('href', urlEventsLink);
            eventLink.innerHTML = number.textContent;
  
            // number.innerHTML = eventLink;
            number.innerHTML = '';
            number.appendChild(eventLink);
          }

          // var title = document.createElement('span');
          // title.className += "cld-title";
          // if(typeof calendar.Model[n].Link == 'function' || calendar.Options.EventClick){
          //   var a = document.createElement('a');
          //   a.setAttribute('href', '#');
          //   a.innerHTML += calendar.Model[n].Title;
          //   if(calendar.Options.EventClick){
          //     var z = calendar.Model[n].Link;
          //     if(typeof calendar.Model[n].Link != 'string'){
          //         a.addEventListener('click', calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)) );
          //         if(calendar.Options.EventTargetWholeDay){
          //           day.className += " clickable";
          //           day.addEventListener('click', calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)) );
          //         }
          //     }else{
          //       a.addEventListener('click', calendar.Options.EventClick.bind(null, z) );
          //       if(calendar.Options.EventTargetWholeDay){
          //         day.className += " clickable";
          //         day.addEventListener('click', calendar.Options.EventClick.bind(null, z) );
          //       }
          //     }
          //   }else{
          //     a.addEventListener('click', calendar.Model[n].Link);
          //     if(calendar.Options.EventTargetWholeDay){
          //       day.className += " clickable";
          //       day.addEventListener('click', calendar.Model[n].Link);
          //     }
          //   }
          //   title.appendChild(a);
          // }
          // else{
          //   title.innerHTML += '<a href="' + calendar.Model[n].Link + '">' + calendar.Model[n].Title + '</a>';
          // }
          // number.appendChild(title);
        }
      }
      day.appendChild(number);

      // If Today..
      if((i+1) == calendar.Today.getDate() && calendar.Selected.Month == calendar.Today.Month && calendar.Selected.Year == calendar.Today.Year){
        day.className += " today";
      }
      days.appendChild(day);
    }

    // Next Month's Days
    // Always same amount of days in calander
    let extraDays = 13;
    if(days.children.length>35){extraDays = 6;}
    else if(days.children.length<29){extraDays = 20;}

    for(let i = 0; i < (extraDays - calendar.Selected.LastDay); i++){
      const day = document.createElement('li');
      day.className += "cld-day nextMonth";
      //Disabled Days
      let d = (i + calendar.Selected.LastDay + 1)%7;
      for(let q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }
      }

      let number = DayNumber(i+1);
      day.appendChild(number);

      days.appendChild(day);
    }

    mainSection.appendChild(days);
  }
  if(calendar.Options.Color){
    mainSection.innerHTML += '<style>.cld-main{color:' + calendar.Options.Color + ';}</style>';
  }
  if(calendar.Options.LinkColor){
    mainSection.innerHTML += '<style>.cld-title a{color:' + calendar.Options.LinkColor + ';}</style>';
  }
  element.appendChild(mainSection);

  if(calendar.Options.NavShow && calendar.Options.NavVertical){
    AddSidebar();
  }
  if(calendar.Options.DateTimeShow){
    AddDateTime();
  }
  AddLabels(days);
  AddDays();
}

function caleandar(el, data, settings, lang, urlEvents){
  const obj = new Calendar(data, settings);
  // createCalendar(obj, el);
  createCalendar(obj, el, '', lang, urlEvents);
}

export { caleandar }; 
