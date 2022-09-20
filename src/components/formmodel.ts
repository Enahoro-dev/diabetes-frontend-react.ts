interface form{
    id:number,
    name:string,
    label:string,
    type:string
}

//export model for all form content
export const forms:form[]= [{
    id:1,
    name:'name',
    label:'Name (Required)',
    type:'text'
},{
    id:2,
    name:'age',
    label:'Age (Required)',
    type:'number'
},{
    id:3,
    name:'email',
    label:'Email Address (Required)',
    type:'text'
},{
    id:4,
    name:'pregnancy',
    label:'Previous Pregnancies',
    type:'number'
},{
    id:5,
    name:'glucose',
    label:'Plasma Glucose After OGTT(mg/dl)',
    type:'number'
},{
    id:6,
    name:'pressure',
    label:'Diastolic Blood Pressure(mm/Hg)',
    type:'number'
},{
    id:7,
    name:'thickness',
    label:'Triceps Skin Thickness(mm)',
    type:'number'
},{
    id:8,
    name:'insulin',
    label:'2-Hour Serum Insulin(miU/ml)',
    type:'number'
},{
    id:9,
    name:'bmi',
    label:'Body Mass Index(BMI)',
    type:'number'
},]