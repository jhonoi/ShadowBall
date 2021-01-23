import React, { useState, useEffect, useRef } from "react"
import {notes} from './databse.js'
import {Editor, EditorState, RichUtils, KeyBindingUtil, getDefaultKeyBinding,convertToRaw} from 'draft-js';
import Body from './Shared/body'
import Header from './Shared/header'
import debounce from "lodash.debounce"
import './notes.css'
import Axios from "axios"


const Note = ()=>{
    //console.log(notes);
    
    const [highlight,setHighlight] = useState(false);
    const [color,setColor]=useState("#63DD67");
    //INTERCHANGEABLE NOTE SECTION
    const [page,setPage]=useState({//tracks the current page , total pages and the type of change that occurs everytime
        currpage:1,
        totalpages:1,
        typeofchange:"increase"
    });

    //Declartion for Editor Variables
    const styleMap ={// custom styles for heading and highlight features in notes app
        'HIGHLIGHT':{
            backgroundColor: color
        },
        'HEADING':{
            fontWeight: "bold",
            fontSize: "2em",
            textDecoration: "underline"
        }
    }
    
    const [editorState, setEditorState] = useState(// Basically this encapsulates everything in the text area , the styles , text etc.
        () => {
            if(notes.length!==0){
                return notes[0];
            }else{
                return EditorState.createEmpty()
            }},
    );

    
    // }
    useEffect(()=>{
        if(page.typeofchange==="increase")
        {
           setEditorState(page.currpage===page.totalpages&&notes[page.currpage-1]===undefined?EditorState.createEmpty():notes[page.currpage-1]);
           /*if current page equal total pages aka the last page (3/3) , if this page is undefined it creates an empty state else it
            stores whatever is currently in the editor*/
            
        }else if(page.typeofchange==="decrease")
        {
            setEditorState(page.currpage===page.totalpages&&notes[page.currpage-1]!==""?EditorState.createEmpty():notes[page.currpage-1]);
             /*if current page equal total pages aka the last page (3/3) , if this page is empty it creates an empty state else it
            stores whatever is currently in the editor*/
        }
        
        
    },[page]);//only occurs when the currpage changes
    useEffect(()=>{
        notes[page.currpage-1]=editorState;
        //console.log(newNotes);
        
        
    },[editorState,page.currpage]);//everytime the editor changes the database is updated with the new state

    const autosave = (notes)=>
    {
        let newNotes=[];
        console.log(notes.length);
        
        for(var x=0;x<notes.length;x++)
        {
            newNotes.push(JSON.stringify(convertToRaw(notes[x].getCurrentContent())));
            //console.log(newNotes[x]);
        }
        console.log(newNotes);
        
        
        Axios.post("api/notes/Beerus1",newNotes,{headers:{"Content-Type":"application/json"}}).then(()=>{console.log("yurr")}).catch((e)=>{console.log(e);
        });
    }
    const nextPage =()=>{//changes to the next page
        setPage(()=>{
            return({
                currpage:page.currpage+1,//increments to
                totalpages:page.currpage===page.totalpages?page.totalpages+1:page.totalpages,
                typeofchange:"increase"
            })
        });
    }
    
    const prevPage = ()=>{
        setPage(()=>{
            return({
                currpage:page.currpage===1?page.currpage:page.currpage-1,
                totalpages:page.totalpages,
                typeofchange:"decrease"
            })
        });
    }
    //END OF NOTE
    //START OF EDITOR CODE
    
    const KeyBindingFunct =(e)=>{

        if (((e.key==='d')||(e.key==='D')) && KeyBindingUtil.hasCommandModifier(e)) {
            return 'HEADING';
        }else if(((e.key==='H')||(e.key==='h')) && KeyBindingUtil.hasCommandModifier(e))
        {
            return 'HIGHLIGHT';
        }
        return getDefaultKeyBinding(e);

    }

    const handleKeyCommand =(command)=>{
        if(command === "HEADING"){
            const neditorState = RichUtils.toggleInlineStyle(editorState, command);
    
            if (neditorState) {
              setEditorState(neditorState);

              return 'handled';
            }

            return 'not-handled';
        }else if(command==="HIGHLIGHT"){
            const neditorState = RichUtils.toggleInlineStyle(editorState, command);
    
            if (neditorState) {
              setEditorState(neditorState); 
              setHighlight(true);
              return 'handled';
            }

            return 'not-handled';
        }
    }

    if(editorState.getSelection().isCollapsed()&&highlight){
        const neditorState = RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT");

        if (neditorState) {
            setEditorState(neditorState);
            setHighlight(false);
            return 'handled';
        }
        return 'not-handled';

    }

    //END OF EDITOR CODE
    return (
        <div className='notes'>
            <Body>
                <Header title='Psychology Notes' color='#63DD67' />
                <div className='editorContainer'>
                    <Editor
                        customStyleMap={styleMap} 
                        editorState={editorState}
                        onChange={setEditorState}
                        handleKeyCommand={handleKeyCommand}
                        keyBindingFn={KeyBindingFunct}
                        onBlur={()=>{
                            autosave(notes);}}
                    />
                </div>
                <div className='notesControlsContainer'>
                    <div className='notesEffectsContainer'>
                        <button onMouseDown={(e)=>{e.preventDefault(); handleKeyCommand('HEADING');}}>Heading</button>
                        <button onMouseDown={(e)=>{e.preventDefault(); handleKeyCommand("HIGHLIGHT")}}>Highlight</button>
                        <input onChange={(e)=>{ let val=e.target.value; setColor(val)}} type="color" id="favcolor" name="favcolor" value={color}></input>
                    </div>
                    <div className='notesNavContainer'>
                        <i onClick={prevPage} className="material-icons md-18">navigate_before</i>
                        <span className='cardPosition'>{page.currpage}/{page.totalpages}</span>
                        <i onClick={nextPage} className="material-icons md-18">navigate_next</i>
                    </div>
                </div>
            </Body>
        </div>
    )    
}

export default Note;