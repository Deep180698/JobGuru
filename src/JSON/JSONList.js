const DashboardList =[
    {   
        id:1,
        useData:{
            Name:'Deep Patel',
            profilePic:'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph'
        },
        Title:'New work',
        Description:'Gardning Job Available',
        images:'https://www.thespruce.com/thmb/XoRg5ZDKDhX_XDIu618RYOLHH_s=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vegetable-gardening-in-small-spaces-1403451-01-aa94b9199ba145079de2417b219c89b4.jpg',
        isFavourite:false
    },
    {
        id:2,
        useData:{
            Name:'Raj Kapoor',
            profilePic:'https://img.freepik.com/free-photo/handsome-young-man-with-new-stylish-haircut_176420-19637.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph'
        },
        Title:'Labor work',
        Description:'Packaging Job Available',
        isFavourite:false,
        images:'https://l.hdnux.com/350x235p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/15fdb265424743409c4ec42125154b75.jpg'
    },
    {
        id:3,
        useData:{
            Name:'Heni Patel',
            profilePic:'https://img.freepik.com/free-photo/friendly-smiling-woman-looking-pleased-front_176420-20779.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph'
        },
        Title:'New work',
        Description:'Gardning Job Available',
        isFavourite:false,
        images:'https://www.thespruce.com/thmb/XoRg5ZDKDhX_XDIu618RYOLHH_s=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vegetable-gardening-in-small-spaces-1403451-01-aa94b9199ba145079de2417b219c89b4.jpg'
    },
    {
        id:4,
        useData:{
            Name:'Feni Rai',
            profilePic:'https://img.freepik.com/free-photo/portrait-happy-young-woman-looking-camera_23-2147892777.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph'
        },
        Title:'Labor work',
        isFavourite:false,
        Description:'Packaging Job Available',
        images:'https://l.hdnux.com/350x235p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/15fdb265424743409c4ec42125154b75.jpg'
    },
]
const FAQData = {
    "faq": [
      {
        "id":1,
        "isShow":false,
        "question": "What is the purpose of this app?",
        "answer": "The app is designed to help users manage their tasks and stay organized."
      },
      {
        "id":2,
        "isShow":false,
        "question": "How do I create a new account?",
        "answer": "To create a new account, click on the 'Sign Up' button and fill in the required information."
      },
      {
        "id":3,
        "isShow":false,
        "question": "Can I use this app on multiple devices?",
        "answer": "Yes, you can use the app on multiple devices by logging in with the same account."
      },
      {
        "id":4,
        "isShow":false,
        "question": "How do I reset my password?",
        "answer": "To reset your password, go to the 'Forgot Password' page and follow the instructions sent to your email."
      },
      {
        "id":5,
        "isShow":false,
        "question": "Is my data secure?",
        "answer": "Yes, we use advanced security measures to protect your data."
      }
    ]
  }


  const JobType = {
    
        "JobType": [
          {
            "id":1,
            "isShow":false,
            "icon":'https://cdn-icons-png.flaticon.com/128/3115/3115411.png',
            "typeName": "Information Technology",
          },
          {
            "id":2,
            "isShow":false,
            "icon":'https://cdn-icons-png.flaticon.com/128/2449/2449899.png',
            "typeName": "Healthcare",
          },
          {
            "id":3,
            "isShow":false,
            "icon":'https://cdn-icons-png.flaticon.com/128/3940/3940177.png',
            "typeName": "Design and Creative",
          },
          {
            "id":4,
            "isShow":false,
            "icon":'https://cdn-icons-png.flaticon.com/128/4256/4256900.png',
            "typeName": "Finance",
          },
          {
            "id":5,
            "isShow":false,
            "icon":'https://cdn-icons-png.flaticon.com/128/595/595990.png',
            "typeName": "Marketing",
          },
          {
            "id":6,
            "isShow":false,
            "icon":'https://cdn-icons-png.flaticon.com/128/825/825792.png',
            "typeName": "Engineering",
          },
          {
            "id":7,
            "isShow":false,
            "icon":'https://cdn-icons-png.flaticon.com/128/201/201614.png',
            "typeName": "Education",
          },
          {
            "id":8,
            "isShow":false,
            "icon":'https://cdn-icons-png.flaticon.com/128/6078/6078115.png',
            "typeName": "Culinary",
          },
          {
            "id":9,
            "isShow":false,
            "icon":'https://cdn-icons-png.flaticon.com/128/2823/2823525.png',
            "typeName": "Construction",
          },
          {
            "id":10,
            "isShow":false,
            "icon":'https://cdn-icons-png.flaticon.com/128/2587/2587077.png',
            "typeName": "Sales and Business Development",
          },
        ]

  }

  const Imagelist = [
    { id: '1', imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph' },
    { id: '2', imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph' },
    { id: '3', imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph' },
    { id: '4', imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph' },
    { id: '5', imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph' },
    { id: '1', imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph' },
    { id: '2', imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph' },
    { id: '3', imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph' },
    { id: '4', imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph' },
    { id: '5', imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph' },
    { id: '1', imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph' },
    { id: '2', imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph' },
    { id: '3', imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph' },
    { id: '4', imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph' },
    { id: '5', imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2062017442.1699557938&semt=sph' },
  ];


  
const customData = {
    DashboardList,
    FAQData,
    JobType,
    Imagelist
  };

  export default customData;