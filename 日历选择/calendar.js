function Calendar(id1,id2) {
    var now = new Date()
    this.wrapId=id1
    this.inputId=id2
    this.wrap=document.getElementById(this.wrapId)
    this.year = now.getFullYear()
    this.month = now.getMonth()
    this.date = now.getDate()
    this.day=now.getDay()
}

Calendar.prototype.init = function() {  
    this.render()
    document.getElementById(this.wrapId).style.display='block'
    document.getElementById(this.day).className='nowweek'
    document.getElementById('date_'+this.date).className='nowday'
    var that=this
    var reg=/(date_){1}\d+/i
	var output
    this.wrap.addEventListener('click',function(e) {
    	if (e.target.className=='pre') {
    		that.month--
    		if(that.month<0){
    			that.month=11
    			that.year--
    		}
    	
    		that.render()
    		if(that.year==new Date().getFullYear()&&that.month==new Date().getMonth()){
    			document.getElementById(that.day).className='nowweek'
    			document.getElementById('date_'+that.date).className='nowday'
    		}
    	}
    })

    this.wrap.addEventListener('click',function(e) {
        if (e.target.className=='next') {
    		that.month++
    		if(that.month>11){
    			that.month=0
    			that.year++
    		}
    		that.render()
    		if(that.year==new Date().getFullYear()&&that.month==new Date().getMonth()){
    			document.getElementById(that.day).className='nowweek'
    			document.getElementById('date_'+that.date).className='nowday'
    		}
    	}
    })
	this.wrap.onclick=function(e){
		output=String(that.year)+'-'+String(that.month+1)+'-'+e.target.innerHTML
		if(reg.test(e.target.id)&&parseInt(e.target.innerHTML)===parseInt(e.target.innerHTML)){
			document.getElementById(that.inputId).value=output
		}
	}
}

Calendar.prototype.render=function(){
	this.wrap.innerHTML = '<div class="head"><div class="pre">&lt;</div><div class="next">&gt;</div><div class="date">' + this.year + ' ' + (this.month + 1) + '</div></div> <div class="calbody"></div>'
	var day = document.createElement('table')
    var content = []
    content.push('<tr><td id="0">日</td><td id="1">一</td><td id="2">二</td><td id="3">三</td><td id="4">四</td><td id="5">五</td><td id="6">六</td></tr>')
    content.push('<tr>')
    var firstDay = this.getTimeDate(this.year, this.month, '1')
    var dayCount = this.getDayCount(this.year, this.month)
    var preFirst
    var weekdate = 1
    for (var i = 0; i < firstDay; i++) {
		preFirst = this.getPreMonthCount(this.year, this.month) - firstDay + i + 1
        content.push('<td class="othermonth">' + preFirst + '</td>')

    }
    for (var j = 1; j < dayCount + 1; j++) {
        content.push('<td id="date_'+j+'">' + j + '</td>')
    }
    for (var k = 1; k < dayCount + 1; k++) {
        content.push('<td class="othermonth">' + k + '</td>')
    }
    content.push('</tr>')

    var constr = content.join('')
    var calbody = this.getByClass(document, 'calbody')[0]
    day.innerHTML = constr
    calbody.appendChild(day)
}

Calendar.prototype.getByClass = function(ele, classN) {
    var eleAll = ele.getElementsByTagName("*")
    var arr = []
    for (var i = 0; i < eleAll.length; i++) {
        if (eleAll[i].className == classN) {
            arr.push(eleAll[i])
            break
        }
    }
    return arr
}

Calendar.prototype.getDayCount = function(year, month) {
    var count
    switch (month) {
        case 0:
            count = 31
            break
        case 1:
            if (year % 4 == 0) {
                count = 29
            } else {
                count = 28
            }
            break
        case 2:
            count = 31
            break
        case 3:
            count = 30
            break
        case 4:
            count = 31
            break
        case 5:
            count = 30
            break
        case 6:
            count = 31
            break
        case 7:
            count = 31
            break
        case 8:
            count = 30
            break
        case 9:
            count = 31
            break
        case 10:
            count = 30
            break
        case 11:
            count = 31
            break
    }
    return count
}

Calendar.prototype.getTimeDate = function(year, month, date) {
    var day
    var time = new Date(year, month, date)
    day = time.getDay()
    return day
}

Calendar.prototype.getPreMonthCount = function(year, month) {
    if (month == 0) {
        return 31
    } else {
        return this.getDayCount(year, month - 1)
    }
}
