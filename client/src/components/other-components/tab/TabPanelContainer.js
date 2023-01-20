import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
    tabPanelContainer: {
        marginTop: props => props.marginTop? props.marginTop : "60px",
      }
}))

const TabPanelContainer = ({children, className, marginTop, ...others}) => {
    const sProps = {marginTop}
    const styles = useStyles(sProps)

  return (
    <div className={clsx(styles.tabPanelContainer, className)} {...others}>
        {children}
    </div>
  )
}

export default TabPanelContainer;