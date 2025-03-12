import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	palette: {
		background: {
			default: "#e8eaed",
		},
	},

	components: {
		// Name of the component
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 15,
				},
			},
		},
	},
});
