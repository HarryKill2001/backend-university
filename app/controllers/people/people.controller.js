//SERVICES
const postgresService = require("../../services/postgres.service");
const nodemailer = require("nodemailer");
const ExcelJS = require("exceljs");

const _pg = new postgresService();


/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const createPerson = async (req, res) => {
	try {
		let person = req.body;
		let sql = `INSERT INTO public.people (name, email)
        VALUES($1, $2)`;
		let data = [person.name, person.email];
		let result = await _pg.executeSQLData(sql, data);
		if (result.rowCount == 1) {
			let subject = "Welcome to the best university";
			let body = `<h1>Hello ${person.name}, From today you are part of the best university in the world 🧡💛❤ </h1>`;
			await sendMail(subject, body, person.email);
		}
		return res.send({
			ok: result.rowCount == 1,
			message: result.rowCount == 1 ? "Register" : "error",
			content: person,
		});
	} catch (error) {
		return res.send({
			ok: false,
			message: "error in the registration process",
			content: error,
		});
	}
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getReport = async (req, res) => {
	try {
		let sql = `SELECT * FROM public.people`;
		let result = await _pg.executeSQL(sql);
		let rows = result.rows;
		await createReport(rows);
		return res.redirect("http://localhost:3001/reports/university.xlsx");
	} catch (error) {
		return res.send({
			ok: false,
			message: "Failure creating excel",
			content: error,
		});
	}
};

/**
 *
 * @param {string} subject
 * @param {string} body
 * @param {string} to
 */
const sendMail = async (subject, body, to) => {
	let from = '"university" <testeobackend4569852@gmail.com>';
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: "testeobackend4569852@gmail.com",
			pass: "pbqndiuprskwsdpc",
		},
	});
	await transporter.sendMail({
		from: from,
		to: to,
		subject: subject,
		html: body,
	});
};

/**
 *
 * @param {JSON} people
 */
const createReport = async (people) => {
	let workbook = new ExcelJS.Workbook();
	const sheetPeople = workbook.addWorksheet("People");
	sheetPeople.columns = [
		{header: "Id", key: "id", width: 10},
		{header: "Name", key: "name", width: 40},
		{header: "Email", key: "email", width: 40},
	];
	people.forEach((person) => {
		sheetPeople.addRow(person);
	});
	await workbook.xlsx.writeFile("app/static/university.xlsx");
};

module.exports = {createPerson, getReport};
