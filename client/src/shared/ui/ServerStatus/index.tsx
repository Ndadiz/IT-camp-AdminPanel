import React from 'react'
import classes from "./ServerStatus.module.css"

type ServerStatusProps = {
  children: React.ReactNode; 
};
export default function ServerStatus({children} : ServerStatusProps) {
  return (
    <div className={classes.ServerStatus}>
      <div className={classes.StatusContent}>{children}</div>
    </div>
  )
}
