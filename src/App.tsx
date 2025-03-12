import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function App() {
	const [inputValue, setInputValue] = useState("");
	const [selectedValue, setSelectedValue] = useState("");

	const rows = inputValue.split("\n").filter((row) => row.trim() !== "");

	const handleButtonClick = () => {
		if (rows.length > 0) {
			const randomIndex = Math.floor(Math.random() * rows.length);
			setSelectedValue(rows[randomIndex]);
		}
	};

	const handleClose = () => setSelectedValue("");

	return (
		<Container>
			<Typography variant="h3" margin="normal">
				Giveaway
			</Typography>
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
			{selectedValue && (
				<Dialog
					open={selectedValue !== ""}
					onClose={handleClose}
					aria-describedby="alert-dialog-description">
					<DialogContent>
						<DialogTitle id="alert-dialog-title">Giveaway Winner</DialogTitle>
						<DialogContentText id="alert-dialog-description">
							The winner is <strong>{selectedValue}</strong>
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
