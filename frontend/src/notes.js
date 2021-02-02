import React, { useState, useEffect, useRef } from "react"
import {Editor, EditorState, RichUtils, KeyBindingUtil, getDefaultKeyBinding,convertToRaw,convertFromRaw} from 'draft-js';
//import {notes} from "./databse"
import Body from './Shared/body'
import Header from './Shared/header'
import debounce from "lodash.debounce"
import './notes.css'
import Axios from "axios"
import { useParams } from 'react-router-dom'


const Note = ()=>{
    const cid=useParams().cID;
    const [notes,setNotes]=useState(["stuffs"]);

    useEffect(()=>{
        const DB=async()=>{
            let url="/api/notes/"+cid;
             Axios.get(url,{headers:{"Content-Type":"application/json"}}).then((res)=>{return res.data}).then((data)=>{
                let newobj=data.Notes;
                console.log(newobj);
                for(var x=0;x<newobj.length;x++)
                {
                    newobj[x].notes=EditorState.createWithContent(convertFromRaw(JSON.parse(newobj[x].notes)));
                    console.log(newobj[x].notes);
                    
                }
                if(notes[0]==="stuff")
                {
                    setNotes([]);
                }
                if(newobj.length===0)
                {
                    setEditorState(createNote(notes));
                }else{
                    setNotes([...newobj]);
                    setEditorState(newobj[0].notes)
                }
                
            }
                ).catch((e)=>{console.log(e);
            });
        }
        DB();
        
    },[]);
    
    const [highlight,setHighlight] = useState(false);
    const [color,setColor]=useState("#63DD67");
    //INTERCHANGEABLE NOTE SECTION
    const [page,setPage]=useState({//tracks the current page , total pages and the type of change that occurs everytime
        currpage:1,
        totalpages:1,
        typeofchange:"decrease"
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
            if(notes[0]!=="stuffs")
            {
                if(notes.length!==0){
                    return notes[0].notes;
                }else{
                    return EditorState.createEmpty()
                }
            }else{
                return EditorState.createEmpty()
            }
        }
            
    );

    
    // }
    useEffect(()=>{
        if(page.typeofchange==="increase")
        {
            console.log(page.currpage-1);
            
           setEditorState(page.currpage===page.totalpages&&notes[page.currpage-1]===undefined?createNote(notes):notes[page.currpage-1].notes);
           /*if current page equal total pages aka the last page (3/3) , if this page is undefined it creates an empty state else it
            stores whatever is currently in the editor*/
            
        }else if(page.typeofchange==="decrease")
        {
           
            setEditorState(page.currpage===page.totalpages&&notes[page.currpage-1].notes!==""?EditorState.createEmpty():notes[page.currpage-1].notes);
             /*if current page equal total pages aka the last page (3/3) , if this page is empty it creates an empty state else it
            stores whatever is currently in the editor*/
        }
        
        
    },[page]);//only occurs when the currpage changes
    useEffect(()=>{
        if(notes[0]!=="stuffs"){
           // console.log(notes[page.currpage-1].notes);
            if(notes[page.currpage-1]!==undefined)
            {
                Save(notes);
                notes[page.currpage-1].notes=editorState;
            }
        }
        //console.log(newNotes);
        
        
    },[editorState]);//everytime the editor changes the database is updated with the new state

    const createNote = (notes)=>
    {
        let newNotes="";
        let notess={
            courseId:cid,
            notes:EditorState.createEmpty(),
            _id:""
        }
        newNotes=JSON.stringify(convertToRaw(notess.notes.getCurrentContent()));
        //console.log(notess);
        let url="/api/notes/"+cid;
        Axios.post(url,{notes:newNotes},{headers:{"Content-Type":"application/json"}}).then((res)=>{
            //console.log(res.data.Note);
            notess._id=res.data.Note; 
            setNotes([...notes,notess])
        }).catch((e)=>{
                console.log(e);
        });
        return notess.notes;
    }
    const Save=(notes)=>{
        let newNotes="";
        newNotes=JSON.stringify(convertToRaw(notes[page.currpage-1].notes.getCurrentContent()));
        //console.log(notess);
        let url="/api/notes/"+notes[page.currpage-1]._id;
        Axios.patch(url,{notes:newNotes},{headers:{"Content-Type":"application/json"}}).then(()=>{
            console.log("patched");
        }).catch((e)=>{
                console.log(e);
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

    // if(editorState!==undefined)
    // {
    //     if(editorState.getSelection().isCollapsed()&&highlight){
    //         const neditorState = RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT");
    
    //         if (neditorState) {
    //             setEditorState(neditorState);
    //             setHighlight(false);
    //             return 'handled';
    //         }
    //         return 'not-handled';
    
    //     }
    // }

    //END OF EDITOR CODE
    return (<div>
            {notes[0]==="stuffs"?<h1>Loading</h1>:
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
            }
        </div>
    )    
}

export default Note;