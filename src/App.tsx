import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function App() {
	const [inputValue, setInputValue] = useState("");
	const [selectedWinner, setSelectedWinner] = useState("");
	const [winners, setWinners] = useState<string[]>([]);
	const [noRepeat, setNoRepeat] = useState(true);

	const rows = inputValue.split("\n").filter((row) => row.trim() !== "");

	const handleButtonClick = () => {
		if (rows.length > 0) {
			const eligibleWinners = noRepeat ? rows.filter((row) => !winners.includes(row)) : rows;
			if (eligibleWinners.length === 0) {
				alert("All participants have already won");
				return;
			}
			const randomIndex = Math.floor(Math.random() * eligibleWinners.length);
			const winner = eligibleWinners[randomIndex];
			setSelectedWinner(winner);
			setWinners([...winners, winner]);
		}
	};

	const handleClose = () => setSelectedWinner("");

	return (
		<Container>
			<Typography variant="h3" my={3} textAlign={"center"}>
				Simple Giveaway
			</Typography>
			<Card sx={{ padding: 2, margin: 2 }}>
				<FormControlLabel
					control={<Checkbox checked={noRepeat} />}
					label="No repeated winners"
					onChange={(e) => setNoRepeat((e.target as HTMLInputElement).checked)}
				/>
				<TextField
					label="Enter all giveaway entries (one per line)"
					multiline
					rows={4}
					variant="outlined"
					fullWidth
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					margin="normal"
				/>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Typography>Number of entries: {rows.length}</Typography>
					<Button
						variant="contained"
						color="primary"
						onClick={handleButtonClick}
						disabled={rows.length === 0}>
						Start Giveaway
					</Button>
				</Box>
			</Card>
			<Card sx={{ padding: 2, margin: 2 }}>
				<Typography variant="h6" margin="normal">
					Winners
				</Typography>
				{winners.length === 0 && <Typography>No winners yet</Typography>}
				{winners.map((winner, index) => (
					<Typography key={index}>
						{index + 1}. <strong>{winner}</strong>
					</Typography>
				))}
			</Card>
			{selectedWinner && (
				<Dialog
					open={selectedWinner !== ""}
					onClose={handleClose}
					aria-describedby="alert-dialog-description">
					<DialogContent>
						<DialogTitle id="alert-dialog-title">Giveaway Winner</DialogTitle>
						<DialogContentText id="alert-dialog-description">
							The winner is <strong>{selectedWinner}</strong>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} autoFocus>
							Continue
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</Container>
	);
}

export default App;
