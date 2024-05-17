export default interface IService<T>{
    execute(): T | Promise<T>
}