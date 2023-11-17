// import express from "express";
// const express = require("express");
const client = require("./elephantsql");

// const app = express();
export default async function teams(req, res) {
	try {
		const results = await client.query("SELECT * FROM public.teams");
		res.json(results);
		console.log(results);
	} catch (err) {
		console.log(err);
	}
}
