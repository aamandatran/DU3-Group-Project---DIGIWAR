"use strict";

function renderStartPage() {
    display_header_menu()
    document.querySelector("main").innerHTML = `
        <div id="startPage">
            <section>
                <div class="background" id="welcome">
                    <div>WELCOME TO <span>DIGIWAR</span></div>
                    <p>end the war with your wardrobe</p>
                </div>
                <div class="curve">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                        preserveAspectRatio="none">
                        <path
                            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8 C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                            class="shape-fill"></path>
                    </svg>
                </div>
            </section>

            <section id="infoSection">
                <h1>GET STARTED</h1>
                <div>
                    <video autoplay loop muted plays-inline>
                        <source src="../MEDIA/Outfit-generator.mp4">
                    </video>
                    <ol>
                        <li>Sign up <button id="buttonToSignUp">HERE</button></li>
                        <li>Upload clothes your own clothes or add from DIGIWARs wardrobe</li>
                        <li>Use our Outfit Generator to randomize an outfit</li>
                        <li>Lastly... end the war with your wardrobe!</li>
                    </ol>
                </div>
            </section>

            <section id="aboutUs">
                <div class="curve" id="curve2">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                        preserveAspectRatio="none">
                        <path
                            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                            class="shape-fill"></path>
                    </svg>
                </div>
                <div id="us">
                    <h1>WHO ARE WE?</h1>

                    <div>
                        <div class="box">
                            <div class="picture"></div>
                            <h3>Amanda Tran</h3>
                        </div>
                        <div class="box">
                            <div class="picture"></div>
                            <h3>Kajsa Wallander</h3>
                        </div>
                        <div class="box">
                            <div class="picture"></div>
                            <h3>Wille Sjöstedtthiel</h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;

    document.querySelector("#buttonToSignUp").addEventListener("click", renderRegisterPage);
}