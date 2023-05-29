// use std::ffi::{OsString, OsStr};
use widestring::U16String;
use std::env::current_dir;
use relative_path::RelativePath;
use libloading::{Library, Symbol};

use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};

type SetAssemblyNameFn = fn(&U16String) -> bool;

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

// fn set_assembly_name(assembly_name: &U16String, path: &OsStr) -> Result<
// bool, Box> {
// unsafe {
// let lib = libloading::Library::new(path)?;
// let func: libloading::Symbol
// bool> =
// lib.get(b"CSharp_NativeCredentials_SetAssemblyName")?;
// Ok(func(assembly_name))
// }
// }

fn licensing_testing() {
    let root = current_dir().unwrap();
    let relative_path = RelativePath::new("src/lib64/AbtLicensingNative.dll");
    let full_path = relative_path.to_path(&root);
    let library_path = full_path.to_str().unwrap();
    println!("Loading lib from {}", library_path);
    unsafe {
        let lib = Library::new(library_path).unwrap();
        let func: Symbol<SetAssemblyNameFn> = lib.get(b"CSharp_NativeCredentials_SetAssemblyName").unwrap();
        let assembly_name = U16String::from_str("TestAssemblyName");
        let res = func(&assembly_name);
        println!("Load result {}", res);
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    licensing_testing();
    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(echo)
            .route("/hey", web::get().to(manual_hello))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}