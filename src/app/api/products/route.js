import { NextResponse } from "next/server";
import {conn} from '@/libs/mysql';
import { processImage } from "@/libs/processImage";
import {unlink} from 'fs/promises';
//import path from 'path';
//import cloudinary from "@/libs/cloudinary";
//import {v2 as cloudinary} from 'cloudinary';


/*
cloudinary.congif({
    cloud_name: 'fazttech',
    api_key: '1234125325245235',
    api_secret: '**********************' // deben reemplazarse los *** por la contrasena real
});
*/
//---------------------------------------------------------
export async function GET(){
    try {
        const results = await conn.query("SELECT * FROM product");
        return NextResponse.json(results);
    } catch (error) {
      return NextResponse.json(
        {
            message: error.message,
        },
        {
            status: 500,
        }        
      ); 
    } 
    //return NextResponse.json('listando productos');   
}
//---------------------------------------------------------
export async function POST(request){
    try{ 
        //const {name, description, price} = await request.json();
        const data = await request.formData();
        const image = data.get("image");
        //const image = data.get("image");
        
        if(!data.get("name")){
            return NextResponse.json(
            {
                message: "Image is required",
            }, {
                status: 400
            });
        }
       
        /*
        console.log({
            image: data.get('image')
        });
        */

        if(!image){
            return NextResponse.json(
            {
                message: "Image is required",
            }, {
                status: 400
            });
        }

        const filePath = await processImage(image);       
        //const res = await cloudinary.uploader.upload(filePath);
        //console.log(res);
/*
        if(res){
            await unlink(filePath);
        }
*/
        const result = await conn.query("INSERT INTO product SET ?",{
            name: data.get("name"),
            description: data.get("description"),
            price: data.get("price"),
            //image: res.secure_url, //lo que se guarda en la bd es la url de la imagen en un hosting en la nube
        });
        
        //console.log(result);
    
        //return NextResponse.json('creando producto');   
        return NextResponse.json({
          
            name: data.get("name"), 
            description: data.get("description"),
            price: data.get("price"),
            id: result.insertId,
          
        });   
    }catch(error){
        console.log(error);
        return NextResponse.json({
            message: error.message
        }, 
        {
            status: 500,
        });
    }

    
}