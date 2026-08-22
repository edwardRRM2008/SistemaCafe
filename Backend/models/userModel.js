import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// Modelo de usuario. La contrasena nunca se guarda en texto plano.
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
			select: false,
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
	},
	{ timestamps: true },
)

userSchema.pre('save', async function hashPassword() {
	if (!this.isModified('password')) return

	this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = function comparePassword(password) {
	return bcrypt.compare(password, this.password)
}

export default mongoose.model('User', userSchema)
