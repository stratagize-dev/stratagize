/**
 *
 * @export
 * @interface PolylineMap
 */
export interface PolylineMap {
  /**
   * The identifier of the map
   * @type {string}
   * @memberof PolylineMap
   */
  id?: string;
  /**
   * The polyline of the map, only returned on detailed representation of an object
   * @type {string}
   * @memberof PolylineMap
   */
  polyline?: string;
  /**
   * The summary polyline of the map
   * @type {string}
   * @memberof PolylineMap
   */
  summaryPolyline?: string;
}
