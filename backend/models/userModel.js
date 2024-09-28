
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
			  validator: function (v) {
				return /^[a-zA-Z0-9._%+-]+@vitbhopal\.ac\.in$/.test(v);
			  },
			  message: props => `${props.value} is not a valid VIT Bhopal email address!`
			}
		},
		password: {
			type: String,
			minLength: 6,
			required: true,
		},
		profilePic: {
			type: String,
			default: "",
		},
		followers: {
			type: [String],
			default: [],
		},
		following: {
			type: [String],
			default: [],
		},
		bio: {
			type: String,
			default: "",
		},
		linkedin: {  // LinkedIn field added
			type: String,
			default: "",
			validate: {
				validator: function (v) {
					// Basic validation for LinkedIn URL format
					return /^https:\/\/(www\.)?linkedin\.com\/.*$/.test(v);
				},
				message: props => `${props.value} is not a valid LinkedIn URL!`,
			},
		},
		isFrozen: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

export default User;
