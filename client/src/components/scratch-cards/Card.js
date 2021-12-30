import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Card as MUICard } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {

    },
});


const Card = ({ card, onClick }) => {
    const styles = useStyles();
    const [check, setCheck] = useState(false)
    const handleChange = e => {
        setCheck(!check)
        onClick(e)
    }
    return ( 
        <Grid item xs={12} md={6} xl={4}>
            <MUICard variant="outlined" className={styles.card}>
                <CardContent>
                    <Typography variant="body2" component="p" >
                        Pin: {card.pin}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Serial Number: {card.serial_number}
                    </Typography>
                    <Typography variant="body2" component="p" >
                        Used before: {card.used ? 'Has been used' : 'Has not been used'}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Exhausted: {card.used_up ? 'Yes' : 'No'}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Number of Usage: {card.usage_count}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Maximun usage: {card.max_usage}
                    </Typography>
                </CardContent>
                <CardActions>
                    {!card.printed ? <FormControlLabel
                        control={
                            <Checkbox
                                checked={check}
                                onChange={handleChange}
                                color="primary"
                                id={card._id}
                            />
                        }
                        label="Select for printing"
                        disabled={card.printed}
                    />:
                    <Typography variant="subtitle2">Printed already</Typography>}
                </CardActions>
            </MUICard>
        </Grid>
    )
}

export default Card
