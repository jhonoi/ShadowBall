import React from 'react'
import './tag.css'

const Tag = (props) => {
    let classTheme
    switch (props.title.toLowerCase()) {
        case 'streak':
            classTheme = 'greenTagTheme'
            break
        case 'quiz':
            classTheme = 'greenTagTheme'
            break
        case 'paper':
            classTheme = 'blueTagTheme'
            break
        case 'project':
            classTheme = 'orangeTagTheme'
            break
        case 'presentation':
            classTheme = 'purpleTagTheme'
            break
        case 'exam':
            classTheme = 'redTagTheme'
            break
        default:
            classTheme = ''
            break
    }

    return (<div className={classTheme + " tag"} > {props.title} </div>)
}

export default Tag