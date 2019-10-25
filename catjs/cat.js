/*

              ,---------------------------.
     ^,^      |     welcome to CAT.JS!    | `  _ ,  '
    (o o)     `--------------------------(_-  (o)o)  -
ooO--(_)--Ooo---------------------------- -ooO'(_)--Ooo-

a virtual pet cat for your website
you can pet the cat!

------------------by alienmelon-------------------------

*/

//cat sounds are the sounds the cat makes when you click on cat
//cat images have a few idle animations
//pet is when you click on the cat and cat squeaks
var arr_catSounds = ["AUD_CAT_18.mp3", "AUD_CAT_01.mp3", "AUD_CAT_02.mp3", "AUD_CAT_03.mp3", "AUD_CAT_04.mp3", "AUD_CAT_05.mp3", "AUD_CAT_06.mp3", "AUD_CAT_07.mp3", "AUD_CAT_08.mp3", "AUD_CAT_09.mp3", "AUD_CAT_10.mp3", "AUD_CAT_11.mp3", "AUD_CAT_12.mp3", "AUD_CAT_13.mp3", "AUD_CAT_14.mp3", "AUD_CAT_15.mp3", "AUD_CAT_16.mp3", "AUD_CAT_17.mp3"];
var arr_catImages_idle = ["IMG_CATJS_IDLE_05.gif", "IMG_CATJS_IDLE_03.gif", "IMG_CATJS_IDLE_02.gif", "IMG_CATJS_IDLE_01.gif"];
var arr_catImages_pet = ["IMG_CATJS_PET_03.gif", "IMG_CATJS_PET_02.gif", "IMG_CATJS_PET_01.gif"];
//console cat expressions
var arr_consoleCat = ["u", "v", "o", "U", "O", ".", "_", "V"];
var arr_consoleCatEyes = ["o", "-"];

//paths to images and sounds. if you move them, update the folder name here...
var str_soundPath = "catjs/catjs_audio";
var str_imagePath = "catjs/catjs_images";

//cat height & width (if you change the cat graphic you have to update these)
var num_catWidth = 270;
var num_catHeight = 235;

//vars
var snd_cat; //sound object
var div_cat; //cat div
var button_pet_cat; // keyboard pet cat button
var bool_pet = false; //is cat being pet?
var int_cat; //interval for cat (control animation)
var num_animationChange = 100; //count down to change cat animation

//control the visibility of elements
function hideThis(str_element){
	document.getElementById(str_element).style.visibility = "hidden";
}
function showThis(str_element){
	document.getElementById(str_element).style.visibility = "visible";
}
//return a random number within a range
function math_randRange(num_min, num_max){
    return (Math.floor(Math.random() * (num_max - num_min + 1)) + num_min);
}

//everytime you pet the cat console cat gets pet too!
function consoleCat(){

	var u = arr_consoleCat[Math.ceil(Math.random()*arr_consoleCat.length)-1];
	var e = arr_consoleCatEyes[Math.ceil(Math.random()*arr_consoleCatEyes.length)-1];

	if(Math.random()*100 > 50){

		console.log("       /\u005C ___ /\u005C");
		console.log("      (  " + e + "   " + e + "  )");
		console.log("       \u005C  >" + u + "<  / ");
		console.log("       /       \u005C ");
		console.log("      /         \u005C       ^");
		console.log("     |           |     //");
		console.log("      \u005C         /    //");
		console.log("       ///  /// ");


	}else{

		console.log("      ");
		console.log("        /\u005C___/\u005C");
		console.log("       ( " + e + "   " + e + " )");
		console.log("       (  =" + u + "=  )");
		console.log("       (        )");
		console.log("       (         )");
		console.log("       (          )))))))))))");
		console.log("        ///  /// ");

	}
}

function playCatSound(){
	//stop first (if a sound is playing)
	if(snd_cat != undefined){
		snd_cat.pause();
	}
	//
	snd_cat = new Audio(str_soundPath + "/" + arr_catSounds[Math.ceil(Math.random()*arr_catSounds.length)-1]);
	snd_cat.play();
	//snd_cat.onended = function(){ ... };
}

//show a random idle or pet animation
function showRandomIdle(){
	showThis("cat_idle0" + String(Math.ceil(Math.random()*arr_catImages_idle.length)));
}
function showRandomPet(){
	showThis("cat_pet0" + String(Math.ceil(Math.random()*arr_catImages_pet.length)));
}

function changeCatIdleAnimation(){
	for(var i = 0; i<arr_catImages_idle.length; ++i){
		hideThis("cat_idle0" + String(i + 1));
	}
	showRandomIdle();
}

function resetCatPetState(){
	num_animationChange = math_randRange(10, 50);
	bool_pet = false;
	hideAllCatAnimations();
	showRandomIdle();
}

function hideAllCatAnimations(){
	//hide all and show only one (the starting idle animation)
	for(var i = 0; i<arr_catImages_idle.length; ++i){
		hideThis("cat_idle0" + String(i + 1));
		//testing
		//document.getElementById(["cat_idle0" + String(i + 1)]).style.left = String(i*2) + 'px';
	};
	for(var i = 0; i<arr_catImages_pet.length; ++i){
		hideThis("cat_pet0" + String(i + 1));
	};
}

function animateCat(){
	//if default, cycle through divs
	//if clicked hold off until counter reaches 0 and then go back to default

	//not clicked (idle)
	if(!bool_pet){
		num_animationChange -= 1;
		//change animation
		if(num_animationChange <= 0){
			//update value
			num_animationChange = math_randRange(10, 50);
			changeCatIdleAnimation();
		}
	}

	//clicked (pet toggled)
	if(bool_pet){
		num_animationChange -= 1;
		//reset
		if(num_animationChange <= 0){
			resetCatPetState();
		};
	}

}

function petCat(){
	//toggle bool (to keep idle from playing)
	bool_pet = true;
	playCatSound();
	//hide all
	hideAllCatAnimations();
	//show one random pet animation
	showRandomPet();
	//set countdown to very low (reset)
	num_animationChange = math_randRange(5, 10);
	//console.log random cute message
	consoleCat();
}

function showPetButton(){
	button_pet_cat.style.clip = 'auto';
}

function hidePetButton(){
	button_pet_cat.style.clip = 'rect(1px,1px,1px,1px)';
}

//show hand as cursor and theme it a little...
function event_cat_mouseOver(){
	div_cat.style.cursor = 'grab';
}
function event_cat_mouseDown(){
	div_cat.style.cursor = 'grabbing';
}

//add animations (animated gif states) to main parent container
function makeCatAnimations(str_id, str_image, appendTo){
	var catAnim = document.createElement("div");
	catAnim.id = str_id;
	catAnim.className = "catjs";
	appendTo.appendChild(catAnim);
	catAnim.innerHTML = '<img src="'+str_imagePath + "/" + str_image + '" alt="Cat">';
	catAnim.style.position = 'absolute';
	//catAnim.style.width = num_catWidth+"px";
	//catAnim.style.height = num_catHeight+"px";
}

function setupCat(){

	//make parent div (cat container)
	div_cat = document.createElement("div");
	div_cat.id = "Cat";
	div_cat.className = "catjs";
	//style the cat
	div_cat.style.position = 'fixed';
	//div_cat.style.width = num_catWidth+"px";
	//div_cat.style.height = num_catHeight+"px";
	div_cat.style.left = '0px';
	div_cat.style.bottom = num_catHeight + 'px';

	button_pet_cat = document.createElement("button");
	button_pet_cat.textContent = "Pet cat";
	button_pet_cat.style.position = 'fixed';
	button_pet_cat.style.left = '0px';
	button_pet_cat.style.bottom = '0px';
	hidePetButton();

	//add images
	//the idle animations
	for(var i = 0; i<arr_catImages_idle.length; ++i){
		makeCatAnimations("cat_idle0" + String(i + 1), arr_catImages_idle[i], div_cat);
	}
	//the petting animations
	for(var i = 0; i<arr_catImages_pet.length; ++i){
		makeCatAnimations("cat_pet0" + String(i + 1), arr_catImages_pet[i], div_cat);
	}

	//add cat last...
	document.getElementsByTagName("body")[0].appendChild(div_cat);
	div_cat.appendChild(button_pet_cat);

	//hide all
	hideAllCatAnimations();
	//show first
	showThis("cat_idle01");


}

//CALL THIS TO MAKE THE CAT GO AWAY
//remove the cat from your page :(
function shoo(){
	//remove all
	div_cat.removeEventListener("click", petCat);
	div_cat.removeEventListener("mouseover", event_cat_mouseOver);
	div_cat.removeEventListener("mouseup", event_cat_mouseOver);
	div_cat.removeEventListener("mousedown", event_cat_mouseDown);
	//
	clearInterval(int_cat);
	document.getElementById("Cat").remove();
}

function cat(){

	console.log("       /\u005C_/\u005C ");
	console.log("      ( o.o )");
	console.log("       > ^ <          a cat approaches!");

	setupCat();
	num_animationChange = math_randRange(10, 50);

	int_cat = setInterval(animateCat, 100);

	div_cat.addEventListener("click", petCat);
	div_cat.addEventListener("mouseover", event_cat_mouseOver);
	div_cat.addEventListener("mouseup", event_cat_mouseOver);
	div_cat.addEventListener("mousedown", event_cat_mouseDown);

	// pet button implicitly pets cat when pressed,
	// due to bubbling click event of `div_cat`
	button_pet_cat.addEventListener("focus", showPetButton);
	button_pet_cat.addEventListener("blur", hidePetButton);

	//shoo();
}
