// use std::ffi::{OsString, OsStr};
use widestring::Utf16String;
use std::env::current_dir;
use relative_path::RelativePath;
use libloading::{Library, Symbol};

use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};

type SetAssemblyNameFn = fn(&Utf16String) -> bool;
type SetRuntimeLicenseKeyWFn = fn(&Utf16String) -> bool;
type GetRuntimeKeyStatus = fn() -> String;

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

fn licensing_testing() {
    let root = current_dir().unwrap();
    let relative_path = RelativePath::new("src/lib64/AbtLicensingNative.dll");
    let full_path = relative_path.to_path(&root);
    let library_path = full_path.to_str().unwrap();
    println!("Loading lib from {}", library_path);
    unsafe {
        let lib = Library::new(library_path).unwrap();
        let func: Symbol<SetAssemblyNameFn> = lib.get(b"CSharp_NativeCredentials_SetAssemblyName").unwrap();
        let assembly_name = Utf16String::from_str("dataPARC.Nexus.UIService");
        // let assembly_name = Utf16String::from_str("AqueductFluidicsApp");
        let res = func(&assembly_name);
        println!("SetAssemblyName result {}", res); 
    }
    unsafe {
        let lib = Library::new(library_path).unwrap();
        let func2: Symbol<SetRuntimeLicenseKeyWFn> = lib.get(b"CSharp_NativeCredentials_SetRuntimeLicenseKeyW").unwrap();
        let runtime_key = Utf16String::from_str("6x0SMj/tqmV9esm6O9GPUbzJ7ZrVJaD69CbNHeQiaM6K6np/DTQu5FcEKEF2ogCWPqfdJrTYvah3/EckuSP7l0yVLaMBQp3Sq/P8THTI5S8KBvpgCIkaiqBi+oWzMHIRluwgQau9fpckN+COXKZyHWQM6AcOwW65NavJE+iGU6i1OiiIbeCaERJqsku5i9N8loLXmjlfbokcIhyitsd1DsxXWFvCJ56ASZDTZJaXEEtx7O3hvhay78doXY4MhK/CuYqv6kfvjIz8y59TvWMaP0R6reSVGO3wBGTHUxzoc+RrX9mBsttgW4nrc/M3MItBnHHc05zw5/tLUgDSUphUrx9rYv34HUBwnA1BEnk5Gqm/XyGabdBTGJSl1bKZmprMiRpz67i5nz8orTURRX6LXMio+qHYfIkoXWX+xQLR6/BpGUqh+r2xTClGmzjjRO+aNlpokW5xgfvWe71hMfFIddvaK15I7yIh3dyAAY9jMg+/hPMKS+9TRnWBwedOlv6pGcrReW6P4d+8VXvf4cucYM+5jYuebiWN5/HdykbNS8uqfSsQepFg4NR7lXI9rZIFXGMi/W395ZvNadhubUFlXWUy9jTlqtxblGDZE/QiPvbYkvxkFpx1yGaXWy82N9aKSnX3DhJp2w/VZenAb4Suesj8V9TAqyi6MftzMsslfs2M/Bne2U+jQU5OyMy9x7znJr+P0BaNxTD1oJCU0Kp/doGcC3DW4oA+gHeqcd+fo6zlXwrj23i0wd5T98nyWr2XgKDG00ZLXmmZr6UMUT1WuOnX8xKAAZy6GezKUo4XrVY=");
        // let runtime_key = Utf16String::from_str("/Gnv6xQm3Vn2sNbp+oEGoDbbeYhb9vJdb4QZHU9X+Bu7g8V9/SzFURfsdgIkxGgzHhNICV0Ye5GsMSfoKHlvvPwALxuRNWv0P2smWfjvuFSOoUvQ1N7zqKGnjPhkhH8BVM7tkjU0m50fILJKPBCGM69zP5ygQFP7uVu7UkOKd2WedoOo+6NashPQfP2NcnpEd00Arvb2Cng0AQh5uyUfkhoq+muh9h6JKYI4dTTa42CAciiGgmWJC3NDsY1HPhVSmnrJTloEWHoNE39Rdh/WG+qhMqihgvvo/s9229DC/P00bCgdd7/VeYFAKRjwCvoRhBpXMZKPOHx5bSbtf8KFVPls0gEYu79jptQ63azWsGg9lI4+sxt5sgiodlUCXE84eyE8gGjF1CJ+bdLixGqfaPXVQ3G9qnZ4N9Co2YskilabN+WqehSL+a9FRHYePeIcEIrE8+UJ43GtQqVut71D/SptWFFybaA3qjNNQ/Q2neW+5fgEYyxvxi8T9Jh7MFWg6g3Ra5n6dvyr6zvpWM4A+wuNt/kwysO4p0i2KuE086W2EDvrvtvIsVzrUYT6FuYWFkOPTJaTX5qSfS1zZm/8u5qGa7/N7xUbvdFeuW0bNRgCmVq5bapAEt11ZyrRvGmlJjvwWiJKq/2X4PHx09IHG4RsyhUF9zqwfMlM3674QGPOkeB6");
        let res2 = func2(&runtime_key);
        println!("SetRuntimeLicenseKeyWFn result {}", res2);   
    }
    unsafe {
        let lib = Library::new(library_path).unwrap();
        let func2: Symbol<GetRuntimeKeyStatus> = lib.get(b"CSharp_NativeCredentials_GetRuntimeKeyStatus").unwrap();
        let res2 = func2();
        println!("GetRuntimeKeyStatus result {}", res2);
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