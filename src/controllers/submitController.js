const User = require("../models/User");
const Algorithm = require("../models/Algorithm");
const Cube = require("../models/Cube");
const Solve = require("../models/Solve");
const ollAlgorithms = require("../algs/ollAlgs");
const pllAlgorithms = require("../algs/pllAlgs");
const collAlgorithms = require("../algs/collAlgs");

const updateStatusAlgorithms = async (userId, method, algorithms) => {

    const userAlgs = await Algorithm.find({ algSet: `${method}`, owner: userId });
    if (!userAlgs) { throw new Error("OLL set not found") }
    
	for (let i = 1; i < algorithms.length; i++) {
	  const algo = userAlgs[i-1];
	  algo.algSet = `${method}`;
	  algo.status = req.body[`${method}${i}`];
	  await algo.save();
	}

}


exports.newSolve = async (req, res) => {
	try {
		
		const {id, cubeName, scramble, solveTime} = req.body;
		console.log("llego aqui")
		console.log(id, cubeName, scramble, solveTime)
		
		
		const user = await User.findById(id)
		const cubeSolve = await Cube.findById(cubeName)
		
		const solve = Solve.create({
			owner: user._id,
			cube: cubeSolve._id,
			scramble: scramble,
			solveTime: solveTime,
			category: cubeSolve.category,
			brand: cubeSolve.brand

		})

		res.json("Successfully added new time")
		
	} catch (err) {
		console.log(err)
	}
	
}

	

exports.newTime_post = async (req, res) => {
/* 	console.log(req.user)
	const { time, category } = req.body;
	const newTime = new CubeTime({
		time, 
		category, 
		author: req.user.id
	})
	await newTime.save()
	res.redirect("/profile/"+req.user.id+"/historial") */
}

exports.deleteTime = async (req, res) => {
/* 	try {
		const { id } = req.params;
		
		const deleteTimeId = await CubeTime.findById(id);
		if (!deleteTimeId.author.equals(req.user.id)) {
			throw new Error("That is not your time")
		}
		await deleteTimeId.remove();
		res.redirect("/profile/"+req.user.id+"/historial")
	} catch (error) {
		console.log(error)
		res.redirect("/profile/"+req.user.id+"/historial")
	} */
}

exports.newCube = async (req, res) => {
	try {
		const id = req.params.idUser;
		const { name, brand, category } = req.body;
		
		const user = await User.findById(id);
		if (!user) {throw new Error("User not found")}
		
		console.log(user._id)
		
		const cube = await Cube.create({
			owner: user._id,
			name: name,
			brand: brand,
			category: category
		})
		console.log(id)
		console.log(cube)

		
		res.redirect("/profile/"+id+"/my-cubes")
	} catch (error) {
		console.log(error)
	}
}

exports.settings_post = async (req, res) => {
	try {
		const { name, bio, website, youtube, contactEmail, nationality, theme } = req.body;
		console.log(theme)
		const { id } = req.params;
		const user = await User.findById(id);
		
		if (!user) {
			throw new Error("User not found")
		}
		
		user.name = name;
		user.bio = bio;
		user.website = website;
		user.youtube = youtube;
		user.contactEmail = contactEmail;
		user.nationality = nationality;
		user.theme = theme;
		console.log(user.theme)
		
		const saveUser = await user.save();
		
		res.redirect("/profile/"+user._id)
		
	} catch (error) {
		console.log(error)
		res.redirect("/profile"+user._id)
	}
}

exports.updateMethod = async (req, res) => {
  try {
    const method = req.params.method.toUpperCase();
    const userName = req.params.userName;
    const user = await User.findOne({ username: userName });
    if (!user) {
      throw new Error("User not found");
    }

    const validCategories = ["OLL", "PLL", "COLL", "CMLL"];
    const categoryIndex = validCategories.indexOf(method);
    if (categoryIndex === -1) {
      throw new Error(`${method} is not a valid category`);
    }

    const userAlgs = await Algorithm.find({
      algSet: method,
      owner: user._id,
    });

    for (let i = 0; i < userAlgs.length; i++) {
      const alg = userAlgs[i];
      alg.algSet = validCategories[categoryIndex];
      alg.status = req.body[`${method}${i + 1}`];
      await alg.save();
    }

    res.redirect(`/${user.username}/alg-collection`);
  } catch (error) {
    console.log(error);
    res.redirect(`/${user.username}/alg-collection`);
  }
};

