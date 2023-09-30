import { Typography } from "@mui/material";


export default function ErrorTypography({ text }) {
  return (
    <Typography  style={{color: "red"}}>
      {text}
    </Typography>
  )
}