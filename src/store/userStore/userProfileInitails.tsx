interface UserState {
  loading: boolean
  user: {
    picture: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    role: string | null
    joiningDate: string | null
    status: string | null
    subscriptionId: {
      paymentStatus: string | null
      selectedPlan: string | null
      subscriptionId: string | null
      id: string | null
    }
    location: string | null
    industry: string | null
  }
}

export default UserState
