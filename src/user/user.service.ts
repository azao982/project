// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Crée un nouvel utilisateur et le sauvegarde en base.
   * @param user - objet partiel User (nom, email, password)
   * @returns utilisateur créé
   */
  async create(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  /**
   * Recherche un utilisateur par son email.
   * @param email - adresse email
   * @returns utilisateur ou null si pas trouvé
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  /**
   * Récupère tous les utilisateurs.
   * @returns tableau d'utilisateurs
   */
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Recherche un utilisateur par son id.
   * @param id - identifiant utilisateur
   * @returns utilisateur ou null si pas trouvé
   */
  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
  async createAdmin() {
  const admin = this.userRepository.create({
    nom: 'Admin',
    email: 'admin@example.com',
    password: '123456',
    role: 'admin',
  });
  return this.userRepository.save(admin);
}

}
