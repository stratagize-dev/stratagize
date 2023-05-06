/**
 * An enumeration of the types an activity may have. Note that this enumeration does not include new sport types (e.g. MountainBikeRide, EMountainBikeRide), activities with these sport types will have the corresponding activity type (e.g. Ride for MountainBikeRide, EBikeRide for EMountainBikeRide)
 * @export
 * @enum {string}
 */
export enum ActivityType {
    AlpineSki = <any> 'AlpineSki',
    BackcountrySki = <any> 'BackcountrySki',
    Canoeing = <any> 'Canoeing',
    Crossfit = <any> 'Crossfit',
    EBikeRide = <any> 'EBikeRide',
    Elliptical = <any> 'Elliptical',
    Golf = <any> 'Golf',
    Handcycle = <any> 'Handcycle',
    Hike = <any> 'Hike',
    IceSkate = <any> 'IceSkate',
    InlineSkate = <any> 'InlineSkate',
    Kayaking = <any> 'Kayaking',
    Kitesurf = <any> 'Kitesurf',
    NordicSki = <any> 'NordicSki',
    Ride = <any> 'Ride',
    RockClimbing = <any> 'RockClimbing',
    RollerSki = <any> 'RollerSki',
    Rowing = <any> 'Rowing',
    Run = <any> 'Run',
    Sail = <any> 'Sail',
    Skateboard = <any> 'Skateboard',
    Snowboard = <any> 'Snowboard',
    Snowshoe = <any> 'Snowshoe',
    Soccer = <any> 'Soccer',
    StairStepper = <any> 'StairStepper',
    StandUpPaddling = <any> 'StandUpPaddling',
    Surfing = <any> 'Surfing',
    Swim = <any> 'Swim',
    Velomobile = <any> 'Velomobile',
    VirtualRide = <any> 'VirtualRide',
    VirtualRun = <any> 'VirtualRun',
    Walk = <any> 'Walk',
    WeightTraining = <any> 'WeightTraining',
    Wheelchair = <any> 'Wheelchair',
    Windsurf = <any> 'Windsurf',
    Workout = <any> 'Workout',
    Yoga = <any> 'Yoga'
}