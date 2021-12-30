import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { printCard } from '../../redux/actions/admin-action';


const useStyles = makeStyles({
    flexContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    flexItem: {
        borderStyle: 'solid',
        borderColor: 'darkblue',
        padding: '0px 10px',
        margin: '5px 5px',

    },
    pin: {
        backgroundColor: 'darkgray',
        padding: '0px 5px',
        fontWeight: 'bold'
    },
    sn: {
        padding: '0px 5px',
        fontWeight: 'bold'
    },
    p: {
        margin: '0px auto',
        fontSize: '12px',
    },
    page: {
        textDecoration: 'underline',
    },
    btn: {
        cursor: 'pointer',
        color: '#0973b1',
        borderColor : '#0973b1',
    }
});

const CardsForPrinting = () => {
    const styles = useStyles();
    const { state } = useLocation();
    const ids = (state && state.ids) ? state.ids : [];
    const dispatch = useDispatch();
    const history = useHistory();
    const { data } = useSelector(state => state.admin.scratchCards)

    const printAsync = async () => {
        return window.print();
    }

    const print = async () => {
        await printAsync();
        dispatch(printCard(ids));
        history.push('/admin/avaliable/scratch-cards');
    }

    return (
        <>
            {!data ? <Redirect to={'/admin/avaliable/scratch-cards'} /> :
                <>
                    {ids.length > 0 ?
                        <>
                            <div className={styles.flexContainer}>
                                {/*eslint-disable-next-line array-callback-return*/}
                                {data.map(card => {
                                    if (ids.includes(card._id)) {
                                        return (
                                            <div key={card._id} className={styles.flexItem}>
                                                <p className={styles.p}>
                                                    Visit <em className={styles.page}>https://emakgodsownschools.herokuapp.com</em>
                                                    .<br />Use your card pin and serial number togrther with other necessery information as required to access the right resouce.
                                                </p>
                                                <p className={styles.p}><span>Pin:</span> <em className={styles.pin}>{card.pin}</em></p>
                                                <p className={styles.p}><span>Serial Number:</span> <em className={styles.sn}>{card.serial_number}</em></p>
                                                <p className={styles.p}>This card can be used for {card.max_usage} timed</p>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            <button className={styles.btn} onClick={print}>Print</button>
                        </>
                        : <div>
                            <p>No selected cards for printing</p>
                            <button className={styles.btn} onClick={() => history.push('/admin/avaliable/scratch-cards')}>Select Cards</button>
                        </div>
                    }
                </>
            }
        </>
    )
}

export default CardsForPrinting;
