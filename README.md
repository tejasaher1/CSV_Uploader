CSV Upload Project - 

	This project allows users to upload CSV files and display their data dynamically in a web interface. The project includes features such as uploading csv file, search data and pagination.

	* Features - 
		1] Upload CSV files with dynamic column headers.
		2] Display a list of all uploaded CSV files.
		3] View CSV data in a table format.
		4] Front-end search functionality.
		5] Front-end and server-side validation for CSV file uploads.
		6] Pagination of table data (max 10 records per page).
		7] Chart integration to display a selected column.

	* Project Structure - 
	
	  CSV-Upload/
		|
		├── assets/
		│   ├── css/
		│	├── homeStyle.css
		│	└── style.css
		│   └── img/
		│   └── javascript_file/
		│	     └── script.js
		│ 
		├── config/
		│   ├── mongoose.js
		│
		│
		├── controllers/
		│   ├── deleteCSV_controller.js
		│   └── homeController.js
		│   └── uploadCSV_Controller.js
		│   └── viewCSV_Controller.js
		│
		├── models/
		│   └── fileModel.js
		│
		├── Routes/
		│   ├── mainRote.js
		│   
		│
		├── uploads/
		│   ├── All_file_stored/
		│   
		│
		├── views/
		│   ├── index.ejs
		│   └── viewCSV.ejs
		│
		├── .env
		├── .gitignore
		├── package-lock.json
		├── package.json
		├── README.md
		└── server.js



	* Prerequisites - 
		1- Node.js
		2- npm (Node Package Manager)
		3- MongoDB
	
	
	* Setup - 
	  1- Clone the repository:
	     git clone https://github.com/tejasaher1/CSV_Uploader.git
	     cd CSV_Uploader
	  2- Install dependencies:
	     npm install
	  3- Set up MongoDB:
	     Make sure MongoDB is running on your local machine. You can use MongoDB Atlas for cloud MongoDB or any other MongoDB instance.
	  4- Create a .env file:
	     PORT=8080
	     MONGODB_URI=your_mongodb_connection_string
	  5- Run the project:
	     npm start
	  6- Access the project:
	     Open your browser and navigate to http://localhost:8080
	
	 * Usage
	   1- Uploading a CSV File
	      a -Go to the homepage.
	      b -Click on the "choose file".
	      c -Select a CSV file and upload it.
	   2- Viewing CSV Data
	      a -After uploading, a list of uploaded files will be displayed.
	      b -Click on a view document to see selected file data.
	      c -use search box to search specific data from file.
	      d -Use pagination controls to navigate through data (if the data exceeds 10 records).
	   3- Validation
	      a -Front-end validation ensures only CSV files can be uploaded.
	      b -Server-side validation checks the file type before processing.
	
	
	  * Dependencies-
	     Express
	     Mongoose
	     Multer
	     CSV-Parser
	     EJS
	     Path
	     FS


 
