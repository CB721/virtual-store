import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./style.css";

function ProductCard(props) {
    return (
        <div>
            <Card className="card">
                <CardActionArea>
                    <CardMedia
                        className="card-media"
                        image={props.image}
                        title={props.imageTitle}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.cardTitle}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="h6">
                            {props.cardDescription}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="#e8d7f9">
                        View
                    </Button>
                    <Button size="small" color="#e8d7f9">
                        Purchase
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default ProductCard;