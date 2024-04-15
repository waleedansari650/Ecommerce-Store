import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Chip } from "@mui/material";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../redux/actions/productActions";

function Cards({ item }) {
  const dispatch = useDispatch();
 
  const addToCart = (productId    ) =>{
     dispatch(addProductToCart(productId));

  }

  
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Card sx={{ maxWidth: 270, margin: "2rem 0.5rem" }}>
        <CardMedia
          component="img"
          height="140" // Set a fixed height for the image
          image={item.image}
          alt="Product Image"
        />
        <CardContent style={{ height: "200px" }}> {/* Set a fixed height for the card content */}
          <Typography gutterBottom variant="h5" component="div" style={{ height: "60px" }}> {/* Set a fixed height for the name */}
            {item.name.length > 25 ? `${item.name.slice(0, 20)}...` : item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ height: "60px" }}> {/* Set a fixed height for the description */}
            {item.description.length > 10
              ? `${item.description.slice(0, 90)}...`
              : item.description}
          </Typography>
          <Typography level="body-xs" style={{ marginTop: "0.5rem" }}>
            <b>{item.category}</b>
          </Typography>
          <Typography
            level="title-lg"
            sx={{ mt: 1, fontWeight: "xl" }}
            
          >
            {item.price} $
          </Typography>
          <Typography level="body-sm">
            (Only <b>{item.stock}</b> left in stock!)
          </Typography>
        </CardContent>
        <div
          style={{
            display: "flex",
            flex: "column",
            alignItems: "center",
            justifyContent: "center",
            margin : '1rem 0rem'
          }}
        >
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={()=>{
              addToCart(item._id)
            }}
          >
            Add to Cart
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Cards;
